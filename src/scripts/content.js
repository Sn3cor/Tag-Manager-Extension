import * as XLSX from 'xlsx'

function createLoadButton() {
    const button = document.createElement('button');
    button.innerHTML = "<span> Load file content";
    button.classList.add("btn", "vt-st-add");
    button.type = "button";
    button.id = "LoadButton";
    button.disabled = true;
    return button
}

function createFileInput() {
    const input = document.createElement('input');
    input.type = "file";
    input.accept = ".xls,.xlsx";
    input.id = "FileInput"
    return input
}

function loadContent(file) {
    const reader = new FileReader();
    if (!file) {
        console.log("brak pliku");
        return
    }


    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const addRow = document.querySelector('.wd-vt-simple-table-add-row');
        const tbody = document.querySelector('.vt-simple-table-md tbody');
        if (!addRow || !tbody) {
            console.log("Nie znaleziono tabeli lub przycisku.");
            return;
        }
        //document.querySelectorAll('.wd-vt-st-remove-row-button').forEach(btn => btn.click());

        for (let i = 0; i < 10; i++) {


            let choice = jsonData[i].Value;
            let address = jsonData[i].Adres;
            if (address === undefined) {
                break;
            }
            addRow.click();
            console.log(choice);
            console.log(address);
            console.log(i)
            const row = tbody.querySelector(`.simple-table-row--${i}`);
            const selection = row.querySelector('.blg-select');
            const addressInput = row.querySelector('.blg-input');
            if (selection && addressInput) {
                selection.selectedIndex = choice - 1;
                selection.dispatchEvent(new Event('change', { bubbles: true }));
                addressInput.value = address;
                addressInput.dispatchEvent(new Event('input', { bubbles: true }));
                addressInput.dispatchEvent(new Event('change', { bubbles: true }));
            }


        }

    }
    reader.readAsArrayBuffer(file);
}


const interval = setInterval(() => {
    if (window.location.hash.includes('/container/accounts/') &&
        window.location.hash.includes('/workspaces') &&
        window.location.hash.includes('/activities/create/ogt_ip_mark')) {
        const pos = document.querySelector('.wd-vt-simple-table-add-row');

        if (!pos || (document.querySelector('#LoadButton') && document.querySelector('#FileInput'))) {
            return;
        }

        if (pos.parentNode) {
            const loadButton = createLoadButton();
            const fileInput = createFileInput();

            fileInput.addEventListener("change", () => {
                if (fileInput.files.length > 0) {
                    loadButton.disabled = false;
                }
                else {
                    loadButton.disabled = true;
                }

            })
            loadButton.addEventListener("click", () => loadContent(fileInput.files[0]));

            pos.parentNode.insertBefore(fileInput, pos.nextSibling);
            pos.parentNode.insertBefore(loadButton, pos.nextSibling);
            // clearInterval(interval);

        }
    }
}, 1000);

