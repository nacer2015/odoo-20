/** @odoo-module */

import {patch} from "@web/core/utils/patch";
import {registry} from "@web/core/registry";

function _getReportUrl(action, type, env) {
    let url = `/report/${type}/${action.report_name}`;
    const actionContext = action.context || {};

    if (action.data && JSON.stringify(action.data) !== "{}") {
        const options = encodeURIComponent(JSON.stringify(action.data));
        const context = encodeURIComponent(JSON.stringify(actionContext));
        url += `?options=${options}&context=${context}`;
    } else {
        if (actionContext.active_ids) {
            url += `/${actionContext.active_ids.join(",")}`;
        }
        if (type === "html") {
            const context = encodeURIComponent(JSON.stringify(env.services.user.context));
            url += `?context=${context}`;
        }
    }
    return url;
}


function showLoader() {

    let loader = document.createElement("div");
    loader.id = "print-loader";

    loader.innerHTML = `
<style>
    #print-loader {
        position: fixed;
        inset: 0;
        background: rgba(10, 25, 45, 0.4);
        backdrop-filter: blur(6px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        font-family: system-ui, -apple-system, sans-serif;
        animation: fadeIn .3s ease;
    }

    .print-card {
        width: 340px;
        background: #ffffff;
        border-radius: 24px;
        padding: 38px 28px 34px;
        text-align: center;
        box-shadow: 0 25px 50px rgba(0,80,160,0.12);
        animation: popIn .4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .dots-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: 0 auto 28px;
        height: 40px;
    }

    .dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #4A90E2;
        animation: bounce 1.4s infinite ease-in-out;
    }

    .dot:nth-child(1) { animation-delay: 0s; background: #5B9BD5; }
    .dot:nth-child(2) { animation-delay: 0.2s; background: #4A90E2; }
    .dot:nth-child(3) { animation-delay: 0.4s; background: #3498DB; }

    .print-title {
        font-size: 20px;
        font-weight: 600;
        color: #1a2a44;
        margin-bottom: 6px;
    }

    .print-subtitle {
        color: #5e6f89;
        font-size: 14px;
        margin-bottom: 22px;
        line-height: 1.5;
    }

    .progress {
        height: 5px;
        background: #edf3fc;
        border-radius: 10px;
        overflow: hidden;
    }

    .progress-bar {
        height: 100%;
        width: 40%;
        background: linear-gradient(90deg, #3498DB, #74B9FF);
        border-radius: 10px;
        animation: shimmer 2s infinite ease-in-out;
    }

    @keyframes bounce {
        0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
        40% { transform: translateY(-14px); opacity: 1; }
    }

    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(350%); }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes popIn {
        from { opacity: 0; transform: scale(0.9) translateY(18px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }
</style>

<div class="print-card">
    <div class="dots-container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
    <div class="print-title">Preparing Print Job</div>
    <div class="print-subtitle">Generating document...</div>
    <div class="progress">
        <div class="progress-bar"></div>
    </div>
</div>
`;
    document.body.appendChild(loader);
}

function hideLoader() {
    let loader = document.getElementById("print-loader");
    if (loader) {
        document.body.removeChild(loader);
    }
}

async function _triggerPrintDialog(action, options, env) {
    if (action.report_type === "qweb-pdf") {
        const url = _getReportUrl(action, "pdf", env);

        showLoader();

        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);

                let iframe = document.createElement("iframe");
                iframe.style.position = "absolute";
                iframe.style.width = "0px";
                iframe.style.height = "0px";
                iframe.style.border = "none";
                iframe.src = blobUrl;

                document.body.appendChild(iframe);

                iframe.onload = function () {
                    iframe.contentWindow.focus();
                    iframe.contentWindow.print();
                    hideLoader();
                };

                let intervalCheck = setInterval(() => {
                    if (iframe.contentWindow.closed) {
                        document.body.removeChild(iframe);
                        URL.revokeObjectURL(blobUrl);
                        clearInterval(intervalCheck);
                    }
                }, 1000);
            })
            .catch(error => {
                console.error("Error printing PDF :", error);
                hideLoader();
            });

        return true;
    }
}


registry.category("services").add("preview_pdf_patch", {
    dependencies: ["action"],
    start(env) {
        patch(env.services.action, {
            async _triggerDownload(action, options) {
                return _triggerPrintDialog(action, options, env);
            }
        });
    }
});

registry.category("ir.actions.report handlers").add("preview_pdf", _triggerPrintDialog);
