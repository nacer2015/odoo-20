# Direct Print Preview

**Odoo module to open browser print dialog directly for reports, preventing automatic PDF downloads.**

---

## 🔍 Overview

In standard Odoo, every time you print an invoice, sale order, delivery slip, or any report, a PDF file is automatically downloaded. Over weeks and months, this fills your Downloads folder with thousands of useless files.

**This module changes that default behaviour: the browser’s native print dialog opens immediately instead of downloading the PDF.**  
You can still save the file manually if needed, but your local disk stays clean.

---

## ❓ Why You Need This

- **No more clutter** – avoid `invoice (145).pdf` piling up endlessly  
- **Faster workflow** – one click on “Print” and the print dialog appears directly  
- **Printer ready** – choose your printer, orientation, pages, all in the familiar browser print window  
- **Eco‑friendly** – print only what you really need, reduce digital waste  
- **Zero configuration** – install the module and it works instantly for all report types

---

## ⚙️ How It Works

1. User clicks any **Print** action (invoice, report, label, etc.)
2. The PDF is generated on the Odoo server as usual
3. The module intercepts the download response and opens a new browser tab displaying the PDF
4. The browser’s built‑in print dialog automatically opens
5. After printing (or cancel), the temporary tab closes – no file is saved locally

*No configuration is required. The module works out‑of‑the‑box for all QWeb/PDF reports.*

---

## ✅ Features

- Replaces automatic PDF download with direct print dialog
- Works for **all QWeb and PDF reports** (invoices, sales orders, pickings, purchase orders, etc.)
- Does not affect other report formats (e.g., XLSX, CSV)
- Compatible with Odoo Community and Enterprise editions
- Lightweight – no external dependencies
- Transparent for the user: if the print dialog is cancelled, the tab closes quietly
- Fully compatible with modern browsers (Chrome, Firefox, Edge, Safari)

---

## 📦 Installation

Standard Odoo addon installation
