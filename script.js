console.log("BillSplit is working!");

/* =========================
   DATA
========================= */

let participants = [];

let expenses = [];

let editingExpense = null;

let calculated = false;


/* =========================
   ELEMENTS
========================= */

const billName =
    document.getElementById("billName");

const saveBillBtn =
    document.getElementById("saveBillBtn");

const newBillBtn =
    document.getElementById("newBillBtn");

const billMessage =
    document.getElementById("billMessage");

const participantName =
    document.getElementById("participantName");

const addParticipantBtn =
    document.getElementById("addParticipantBtn");

const participantList =
    document.getElementById("participantList");

const paidBy =
    document.getElementById("paidBy");

const expenseName =
    document.getElementById("expenseName");

const expenseAmount =
    document.getElementById("expenseAmount");

const addExpenseBtn =
    document.getElementById("addExpenseBtn");

const expenseList =
    document.getElementById("expenseList");

const totalAmount =
    document.getElementById("totalAmount");

const calculateBtn =
    document.getElementById("calculateBtn");

const resultSection =
    document.getElementById("resultSection");

const resultTotal =
    document.getElementById("resultTotal");

const resultPeople =
    document.getElementById("resultPeople");

const resultShare =
    document.getElementById("resultShare");

const settlement =
    document.getElementById("settlement");

const receiptBtn =
    document.getElementById("receiptBtn");

const receiptContainer =
    document.getElementById("receiptContainer");

const printReceiptBtn =
    document.getElementById("printReceiptBtn");

const downloadJpgBtn =
    document.getElementById("downloadJpgBtn");

const shareReceiptBtn =
    document.getElementById("shareReceiptBtn");

const closeReceiptBtn =
    document.getElementById("closeReceiptBtn");


/* =========================
   SAVE BILL
========================= */

saveBillBtn.addEventListener(
    "click",
    function () {

        const name =
            billName.value.trim();

        if (!name) {

            alert(
                "Please enter a bill name."
            );

            return;
        }

        billMessage.textContent =
            "Bill saved: " + name;

        billMessage.style.color =
            "#087b4c";

        billMessage.style.fontWeight =
            "bold";

    }
);


/* =========================
   NEW BILL
========================= */

newBillBtn.addEventListener(
    "click",
    function () {

        const answer =
            confirm(
                "Start a new bill? Your current bill, participants and expenses will be cleared."
            );

        if (!answer) {
            return;
        }

        participants = [];

        expenses = [];

        editingExpense = null;

        calculated = false;

        billName.value = "";

        billMessage.textContent = "";

        participantName.value = "";

        expenseName.value = "";

        expenseAmount.value = "";

        paidBy.value = "";

        addExpenseBtn.textContent =
            "Add Expense";

        resultTotal.textContent =
            "0";

        resultPeople.textContent =
            "0";

        resultShare.textContent =
            "0";

        totalAmount.textContent =
            "0";

        participantList.innerHTML =
            "";

        expenseList.innerHTML =
            "";

        settlement.innerHTML =
            "";

        receiptContainer.style.display =
            "none";

        updateParticipants();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        alert(
            "New bill started successfully! 🎉"
        );

    }
);


/* =========================
   PARTICIPANTS
========================= */

addParticipantBtn.addEventListener(
    "click",
    addParticipant
);


participantName.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addParticipant();

        }

    }
);


function addParticipant() {

    const name =
        participantName.value.trim();

    if (!name) {

        alert(
            "Please enter a participant name."
        );

        return;
    }


    const exists =
        participants.some(
            person =>
                person.toLowerCase() ===
                name.toLowerCase()
        );


    if (exists) {

        alert(
            "This person has already been added."
        );

        return;
    }


    participants.push(name);

    /*
        IMPORTANT:

        Clearing the input after adding a name
        allows the next participant to be entered
        immediately.

        Example:

        Jamilu
        Aisha
        Fatima
        Maryam
        Hafsat
    */

    participantName.value = "";

    updateParticipants();

    calculated = false;

}


function updateParticipants() {

    participantList.innerHTML =
        "";

    paidBy.innerHTML =
        `<option value="">
            Select participant
        </option>`;


    participants.forEach(
        function (person) {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "participant";


            const nameSpan =
                document.createElement(
                    "span"
                );

            nameSpan.textContent =
                person;


            const removeButton =
                document.createElement(
                    "button"
                );

            removeButton.className =
                "remove";

            removeButton.textContent =
                "×";


            removeButton.addEventListener(
                "click",
                function () {

                    removeParticipant(
                        person
                    );

                }
            );


            item.appendChild(
                nameSpan
            );

            item.appendChild(
                removeButton
            );

            participantList.appendChild(
                item
            );


            const option =
                document.createElement(
                    "option"
                );

            option.value =
                person;

            option.textContent =
                person;

            paidBy.appendChild(
                option
            );

        }
    );

}


/* =========================
   REMOVE PARTICIPANT
========================= */

function removeParticipant(name) {

    const hasPayment =
        expenses.some(
            expense =>
                expense.paidBy === name
        );


    if (hasPayment) {

        alert(
            "You cannot remove this person because they already have an expense."
        );

        return;
    }


    participants =
        participants.filter(
            person =>
                person !== name
        );


    updateParticipants();

    calculated = false;

}


/* =========================
   ADD EXPENSE
========================= */

addExpenseBtn.addEventListener(
    "click",
    addExpense
);


function addExpense() {

    const name =
        expenseName.value.trim();

    const amount =
        Number(
            expenseAmount.value
        );

    const payer =
        paidBy.value;


    if (!name) {

        alert(
            "Please enter the expense description."
        );

        return;
    }


    if (!amount || amount <= 0) {

        alert(
            "Please enter a valid amount."
        );

        return;
    }


    if (!payer) {

        alert(
            "Please select who paid."
        );

        return;
    }


    if (
        editingExpense !== null
    ) {

        const expense =
            expenses.find(
                item =>
                    item.id ===
                    editingExpense
            );


        if (expense) {

            expense.name =
                name;

            expense.amount =
                amount;

            expense.paidBy =
                payer;

        }


        editingExpense =
            null;

        addExpenseBtn.textContent =
            "Add Expense";

    }

    else {

        expenses.push({

            id:
                Date.now() +
                Math.random(),

            name:
                name,

            amount:
                amount,

            paidBy:
                payer

        });

    }


    expenseName.value =
        "";

    expenseAmount.value =
        "";

    paidBy.value =
        "";


    displayExpenses();

    calculated =
        false;

}


/* =========================
   DISPLAY EXPENSES
========================= */

function displayExpenses() {

    expenseList.innerHTML =
        "";

    let total = 0;


    expenses.forEach(
        function (expense) {

            total +=
                expense.amount;


            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "expense";


            const nameDiv =
                document.createElement(
                    "div"
                );

            nameDiv.className =
                "expense-name";

            nameDiv.textContent =
                expense.name;


            const amountDiv =
                document.createElement(
                    "div"
                );

            amountDiv.className =
                "expense-amount";

            amountDiv.textContent =
                "₦" +
                expense.amount
                    .toLocaleString();


            const payerDiv =
                document.createElement(
                    "div"
                );

            payerDiv.className =
                "expense-payer";

            payerDiv.textContent =
                "Paid by " +
                expense.paidBy;


            const actions =
                document.createElement(
                    "div"
                );


            const editButton =
                document.createElement(
                    "button"
                );

            editButton.className =
                "edit";

            editButton.textContent =
                "Edit";


            editButton.addEventListener(
                "click",
                function () {

                    editExpense(
                        expense.id
                    );

                }
            );


            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.className =
                "delete";

            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteExpense(
                        expense.id
                    );

                }
            );


            actions.appendChild(
                editButton
            );

            actions.appendChild(
                deleteButton
            );


            item.appendChild(
                nameDiv
            );

            item.appendChild(
                amountDiv
            );

            item.appendChild(
                payerDiv
            );

            item.appendChild(
                actions
            );


            expenseList.appendChild(
                item
            );

        }
    );


    totalAmount.textContent =
        total.toLocaleString();

}


/* =========================
   EDIT EXPENSE
========================= */

function editExpense(id) {

    const expense =
        expenses.find(
            item =>
                item.id === id
        );


    if (!expense) {
        return;
    }


    expenseName.value =
        expense.name;

    expenseAmount.value =
        expense.amount;

    paidBy.value =
        expense.paidBy;


    editingExpense =
        id;


    addExpenseBtn.textContent =
        "Update Expense";


    expenseName.focus();

}


/* =========================
   DELETE EXPENSE
========================= */

function deleteExpense(id) {

    const answer =
        confirm(
            "Are you sure you want to delete this expense?"
        );


    if (!answer) {
        return;
    }


    expenses =
        expenses.filter(
            expense =>
                expense.id !== id
        );


    displayExpenses();

    calculated =
        false;

}


/* =========================
   CALCULATE BILL
========================= */

calculateBtn.addEventListener(
    "click",
    calculateBill
);


function calculateBill() {

    if (
        participants.length === 0
    ) {

        alert(
            "Please add participants first."
        );

        return;
    }


    if (
        expenses.length === 0
    ) {

        alert(
            "Please add at least one expense."
        );

        return;
    }


    let total = 0;


    expenses.forEach(
        expense => {

            total +=
                expense.amount;

        }
    );


    const share =
        total /
        participants.length;


    resultTotal.textContent =
        total.toLocaleString();


    resultPeople.textContent =
        participants.length;


    resultShare.textContent =
        Math.round(
            share
        ).toLocaleString();


    const balances = {};


    participants.forEach(
        person => {

            balances[person] =
                -share;

        }
    );


    expenses.forEach(
        expense => {

            balances[
                expense.paidBy
            ] +=
                expense.amount;

        }
    );


    const settlementData =
        buildSettlement(
            balances
        );


    settlement.innerHTML =
        "";


    if (
        settlementData.length === 0
    ) {

        settlement.innerHTML =
            "<p>Everyone is settled! 🎉</p>";

    }

    else {

        settlementData.forEach(
            item => {

                const row =
                    document.createElement(
                        "div"
                    );

                row.className =
                    "settlement-row";


                const text =
                    document.createElement(
                        "span"
                    );

                text.textContent =
                    item.from +
                    " should pay " +
                    item.to;


                const amount =
                    document.createElement(
                        "strong"
                    );

                amount.textContent =
                    "₦" +
                    Math.round(
                        item.amount
                    ).toLocaleString();


                row.appendChild(
                    text
                );

                row.appendChild(
                    amount
                );

                settlement.appendChild(
                    row
                );

            }
        );

    }


    calculated =
        true;


    resultSection.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================
   BUILD SETTLEMENT
========================= */

function buildSettlement(
    balances
) {

    const creditors = [];

    const debtors = [];


    Object.keys(
        balances
    ).forEach(
        person => {

            if (
                balances[person] >
                0.01
            ) {

                creditors.push({

                    name:
                        person,

                    amount:
                        balances[person]

                });

            }


            if (
                balances[person] <
                -0.01
            ) {

                debtors.push({

                    name:
                        person,

                    amount:
                        Math.abs(
                            balances[person]
                        )

                });

            }

        }
    );


    const result = [];

    let debtorIndex = 0;

    let creditorIndex = 0;


    while (
        debtorIndex <
            debtors.length &&
        creditorIndex <
            creditors.length
    ) {

        const debtor =
            debtors[
                debtorIndex
            ];

        const creditor =
            creditors[
                creditorIndex
            ];


        const amount =
            Math.min(
                debtor.amount,
                creditor.amount
            );


        result.push({

            from:
                debtor.name,

            to:
                creditor.name,

            amount:
                amount

        });


        debtor.amount -=
            amount;

        creditor.amount -=
            amount;


        if (
            debtor.amount <
            0.01
        ) {

            debtorIndex++;

        }


        if (
            creditor.amount <
            0.01
        ) {

            creditorIndex++;

        }

    }


    return result;

}


/* =========================
   GENERATE RECEIPT
========================= */

receiptBtn.addEventListener(
    "click",
    generateReceipt
);


function generateReceipt() {

    if (!calculated) {

        alert(
            "Please calculate the bill first."
        );

        return;
    }


    let total = 0;


    expenses.forEach(
        expense => {

            total +=
                expense.amount;

        }
    );


    const share =
        total /
        participants.length;


    /*
        Create a unique receipt number.
    */

    const receiptNumber =
        "BS-" +
        new Date()
            .getFullYear() +
        "-" +
        Math.random()
            .toString(36)
            .substring(
                2,
                8
            )
            .toUpperCase();


    document.getElementById(
        "receiptNumber"
    ).textContent =
        receiptNumber;


    document.getElementById(
        "receiptDate"
    ).textContent =
        new Date()
            .toLocaleString();


    document.getElementById(
        "receiptBillName"
    ).textContent =
        billName.value.trim() ||
        "BillSplit Bill";


    document.getElementById(
        "receiptTotal"
    ).textContent =
        "₦" +
        total.toLocaleString();


    document.getElementById(
        "receiptPeople"
    ).textContent =
        participants.length;


    document.getElementById(
        "receiptPeople2"
    ).textContent =
        participants.length;


    document.getElementById(
        "receiptShare"
    ).textContent =
        "₦" +
        Math.round(
            share
        ).toLocaleString();


    /*
        EXPENSE BREAKDOWN
    */

    const receiptExpenses =
        document.getElementById(
            "receiptExpenses"
        );


    receiptExpenses.innerHTML =
        "";


    expenses.forEach(
        expense => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "receipt-expense";


            const name =
                document.createElement(
                    "span"
                );

            name.textContent =
                expense.name;


            const payer =
                document.createElement(
                    "span"
                );

            payer.textContent =
                expense.paidBy;


            const amount =
                document.createElement(
                    "strong"
                );

            amount.textContent =
                "₦" +
                expense.amount
                    .toLocaleString();


            row.appendChild(
                name
            );

            row.appendChild(
                payer
            );

            row.appendChild(
                amount
            );


            receiptExpenses.appendChild(
                row
            );

        }
    );


    /*
        SETTLEMENT
    */

    const balances = {};


    participants.forEach(
        person => {

            balances[person] =
                -share;

        }
    );


    expenses.forEach(
        expense => {

            balances[
                expense.paidBy
            ] +=
                expense.amount;

        }
    );


    const settlementData =
        buildSettlement(
            balances
        );


    const receiptSettlement =
        document.getElementById(
            "receiptSettlement"
        );


    receiptSettlement.innerHTML =
        "";


    if (
        settlementData.length === 0
    ) {

        receiptSettlement.innerHTML = `

            <div class="receipt-settlement">

                <span>
                    Everyone is settled 🎉
                </span>

                <strong>
                    ₦0
                </strong>

            </div>

        `;

    }

    else {

        settlementData.forEach(
            item => {

                const row =
                    document.createElement(
                        "div"
                    );

                row.className =
                    "receipt-settlement";


                const text =
                    document.createElement(
                        "span"
                    );

                text.textContent =
                    item.from +
                    " → " +
                    item.to;


                const amount =
                    document.createElement(
                        "strong"
                    );

                amount.textContent =
                    "₦" +
                    Math.round(
                        item.amount
                    ).toLocaleString();


                row.appendChild(
                    text
                );

                row.appendChild(
                    amount
                );


                receiptSettlement.appendChild(
                    row
                );

            }
        );

    }


    receiptContainer.style.display =
        "block";


    preparePrintLayout();


    receiptContainer.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================
   SMART PRINT LAYOUT
========================= */

/*
    We specifically optimise the receipt
    for up to 20 participants.

    1 - 10 people:
        comfortable size

    11 - 20 people:
        compact size

    More than 20:
        smaller size and multiple pages
        are allowed when genuinely necessary.
*/

function preparePrintLayout() {

    let scale =
        0.88;


    if (
        participants.length >
        10
    ) {

        scale =
            0.78;

    }


    if (
        participants.length >
        20
    ) {

        scale =
            0.70;

    }


    if (
        expenses.length >
        10
    ) {

        scale -=
            0.04;

    }


    if (
        expenses.length >
        20
    ) {

        scale -=
            0.05;

    }


    /*
        Never make the receipt
        ridiculously small.
    */

    scale =
        Math.max(
            scale,
            0.62
        );


    let printStyle =
        document.getElementById(
            "billsplit-dynamic-print"
        );


    if (!printStyle) {

        printStyle =
            document.createElement(
                "style"
            );

        printStyle.id =
            "billsplit-dynamic-print";

        document.head.appendChild(
            printStyle
        );

    }


    const onePage =
        participants.length <=
        20;


    printStyle.textContent = `

        @page {

            size:
                A4 portrait;

            margin:
                7mm;

        }


        @media print {


            * {

                -webkit-print-color-adjust:
                    exact !important;

                print-color-adjust:
                    exact !important;

            }


            html,
            body {

                margin:
                    0 !important;

                padding:
                    0 !important;

                background:
                    #ffffff !important;

            }


            /*
                Hide the whole application
                except the receipt.
            */

            body > .app > * {

                visibility:
                    hidden !important;

            }


            #receiptContainer,
            #receiptContainer * {

                visibility:
                    visible !important;

            }


            #receiptContainer {

                display:
                    block !important;

                position:
                    absolute !important;

                left:
                    50% !important;

                top:
                    0 !important;

                width:
                    190mm !important;

                margin:
                    0 !important;

                padding:
                    0 !important;

                transform:
                    translateX(-50%) !important;

            }


            /*
                IMPORTANT:

                This is the SAME receipt that
                appears on the screen.

                We are NOT creating another
                PDF design.
            */

            #receipt {

                width:
                    100% !important;

                max-width:
                    none !important;

                margin:
                    0 !important;

                box-shadow:
                    none !important;

                zoom:
                    ${scale} !important;

            }


            /*
                Do not put action buttons
                inside the PDF.
            */

            .receipt-actions,
            #downloadJpgBtn,
            #printReceiptBtn,
            #shareReceiptBtn,
            #closeReceiptBtn {

                display:
                    none !important;

            }


            ${
                onePage
                    ? `

                #receipt,
                #receiptExpenses,
                #receiptSettlement {

                    page-break-inside:
                        avoid !important;

                    break-inside:
                        avoid !important;

                }


                .receipt-section,
                .receipt-expense,
                .receipt-settlement,
                .receipt-header,
                .receipt-footer,
                .verification {

                    page-break-inside:
                        avoid !important;

                    break-inside:
                        avoid !important;

                }

                `
                    : `

                /*
                    For very large bills,
                    individual rows stay together
                    but additional pages are allowed.
                */

                .receipt-expense,
                .receipt-settlement {

                    page-break-inside:
                        avoid !important;

                    break-inside:
                        avoid !important;

                }

                `
            }

        }

    `;

}


/* =========================
   SAVE AS PDF
========================= */

printReceiptBtn.addEventListener(
    "click",
    function () {

        if (!calculated) {

            alert(
                "Please calculate the bill and generate the receipt first."
            );

            return;
        }


        preparePrintLayout();


        /*
            The browser print dialog lets
            the user choose:

            Destination:
            Save to PDF
        */

        setTimeout(
            function () {

                window.print();

            },
            250
        );

    }
);


/* =========================
   CREATE RECEIPT IMAGE
========================= */

async function createReceiptBlob() {

    if (
        typeof html2canvas ===
        "undefined"
    ) {

        throw new Error(
            "html2canvas is not ready."
        );

    }


    const receipt =
        document.getElementById(
            "receipt"
        );


    if (!receipt) {

        throw new Error(
            "Receipt not found."
        );

    }


    const canvas =
        await html2canvas(
            receipt,
            {

                scale:
                    2,

                backgroundColor:
                    "#ffffff",

                useCORS:
                    true,

                logging:
                    false

            }
        );


    return await new Promise(
        function (
            resolve,
            reject
        ) {

            canvas.toBlob(
                function (blob) {

                    if (blob) {

                        resolve(
                            blob
                        );

                    }

                    else {

                        reject(
                            new Error(
                                "Could not create image."
                            )
                        );

                    }

                },

                "image/jpeg",

                0.95

            );

        }
    );

}


/* =========================
   RECEIPT FILE NAME
========================= */

function getReceiptFileName() {

    const receiptNumber =
        document.getElementById(
            "receiptNumber"
        )
        .textContent
        .trim();


    return (
        "BillSplit-" +
        receiptNumber +
        ".jpg"
    );

}


/* =========================
   DOWNLOAD JPG
========================= */

downloadJpgBtn.addEventListener(
    "click",
    downloadReceiptAsJpg
);


async function downloadReceiptAsJpg() {

    try {

        downloadJpgBtn.textContent =
            "⏳ Creating image...";


        const blob =
            await createReceiptBlob();


        const image =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.download =
            getReceiptFileName();


        link.href =
            image;


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        setTimeout(
            function () {

                URL.revokeObjectURL(
                    image
                );

            },
            1000
        );


    }

    catch (error) {

        console.error(
            "JPG generation error:",
            error
        );


        alert(
            "Sorry, the receipt image could not be created. Please try again."
        );

    }


    finally {

        downloadJpgBtn.textContent =
            "🖼️ Download JPG";

    }

}


/* =========================
   SHARE RECEIPT
========================= */

shareReceiptBtn.addEventListener(
    "click",
    shareReceipt
);


async function shareReceipt() {

    try {

        shareReceiptBtn.textContent =
            "⏳ Preparing...";


        const blob =
            await createReceiptBlob();


        const file =
            new File(
                [
                    blob
                ],

                getReceiptFileName(),

                {
                    type:
                        "image/jpeg"
                }

            );


        const receiptNumber =
            document.getElementById(
                "receiptNumber"
            )
            .textContent
            .trim();


        const shareText =
            "BillSplit Receipt " +
            receiptNumber +
            "\n" +
            "Split expenses. Settle easily.";


        /*
            On supported phones and tablets,
            this opens the device's normal
            sharing menu.

            This may include:

            WhatsApp
            Facebook
            Instagram
            X
            Telegram
            Email
            Messages
            etc.

            The exact apps depend on the
            user's device.
        */

        if (
            navigator.share
        ) {

            let canShareFile =
                false;


            try {

                canShareFile =
                    navigator.canShare &&
                    navigator.canShare({
                        files: [
                            file
                        ]
                    });

            }

            catch (error) {

                canShareFile =
                    false;

            }


            if (
                canShareFile
            ) {

                await navigator.share({

                    title:
                        "BillSplit Receipt",

                    text:
                        shareText,

                    files: [
                        file
                    ]

                });

            }

            else {

                await navigator.share({

                    title:
                        "BillSplit Receipt",

                    text:
                        shareText

                });


                /*
                    If the browser can share text
                    but not files, also download
                    the JPG so the user can attach
                    it manually.
                */

                downloadBlob(
                    file,
                    getReceiptFileName()
                );

            }

        }

        else {

            /*
                Desktop fallback.

                Download the receipt and open
                WhatsApp with the receipt text.
            */

            downloadBlob(
                file,
                getReceiptFileName()
            );


            const message =
                encodeURIComponent(
                    shareText +
                    "\n\n" +
                    "The BillSplit receipt JPG has been downloaded. Please attach it to this message."
                );


            window.open(
                "https://wa.me/?text=" +
                message,
                "_blank"
            );

        }

    }

    catch (error) {

        console.error(
            "Share error:",
            error
        );


        /*
            If the user simply cancelled
            the share menu, don't show an
            error message.
        */

        if (
            error.name !==
            "AbortError"
        ) {

            alert(
                "Sharing is not available in this browser. The receipt will be downloaded as a JPG so you can share it manually on WhatsApp, Instagram, Facebook, X or another app."
            );


            try {

                const blob =
                    await createReceiptBlob();


                const file =
                    new File(
                        [
                            blob
                        ],

                        getReceiptFileName(),

                        {
                            type:
                                "image/jpeg"
                        }

                    );


                downloadBlob(
                    file,
                    getReceiptFileName()
                );

            }

            catch (
                downloadError
            ) {

                console.error(
                    downloadError
                );

            }

        }

    }

    finally {

        shareReceiptBtn.textContent =
            "📤 Share Receipt";

    }

}


/* =========================
   DOWNLOAD BLOB
========================= */

function downloadBlob(
    blobOrFile,
    filename
) {

    const url =
        URL.createObjectURL(
            blobOrFile
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        filename;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    setTimeout(
        function () {

            URL.revokeObjectURL(
                url
            );

        },
        1000
    );

}


/* =========================
   CLOSE RECEIPT
========================= */

closeReceiptBtn.addEventListener(
    "click",
    function () {

        receiptContainer.style.display =
            "none";

    }
);



/* =========================
   START APP
========================= */

updateParticipants();

displayExpenses();




/* =================================================
   BILL HISTORY & SAVED BILLS
================================================= */

const billHistory =
    document.getElementById(
        "billHistory"
    );

const clearHistoryBtn =
    document.getElementById(
        "clearHistoryBtn"
    );

const historyMessage =
    document.getElementById(
        "historyMessage"
    );


/* =========================
   STORAGE KEY
========================= */

const BILL_HISTORY_KEY =
    "billSplitHistory";


/* =========================
   GET SAVED BILLS
========================= */

function getSavedBills() {

    try {

        return JSON.parse(
            localStorage.getItem(
                BILL_HISTORY_KEY
            )
        ) || [];

    }

    catch (error) {

        console.error(
            "Could not read bill history:",
            error
        );

        return [];

    }

}


/* =========================
   SAVE BILL TO HISTORY
========================= */

function saveBillToHistory() {

    if (
        participants.length === 0 ||
        expenses.length === 0
    ) {

        alert(
            "Please add participants and expenses before saving the bill."
        );

        return;

    }


    const name =
        billName.value.trim();


    if (!name) {

        alert(
            "Please enter a bill name first."
        );

        billName.focus();

        return;

    }


    let total = 0;


    expenses.forEach(
        expense => {

            total +=
                Number(
                    expense.amount
                );

        }
    );


    /*
        Create a unique ID.
    */

    const savedBill = {

        id:
            Date.now(),

        name:
            name,

        date:
            new Date().toISOString(),

        total:
            total,

        participants:
            JSON.parse(
                JSON.stringify(
                    participants
                )
            ),

        expenses:
            JSON.parse(
                JSON.stringify(
                    expenses
                )
            )

    };


    const history =
        getSavedBills();


    /*
        Put newest bill first.
    */

    history.unshift(
        savedBill
    );


    /*
        Keep the most recent
        50 bills in the browser.
    */

    const limitedHistory =
        history.slice(
            0,
            50
        );


    localStorage.setItem(
        BILL_HISTORY_KEY,
        JSON.stringify(
            limitedHistory
        )
    );


    historyMessage.textContent =
        "✅ Bill saved successfully.";

    historyMessage.style.color =
        "#087b4c";

    historyMessage.style.fontWeight =
        "bold";


    displayBillHistory();


    alert(
        "Bill saved successfully! 📚"
    );

}


/* =========================
   DISPLAY BILL HISTORY
========================= */

function displayBillHistory() {

    if (!billHistory) {
        return;
    }


    const history =
        getSavedBills();


    billHistory.innerHTML =
        "";


    if (
        history.length === 0
    ) {

        historyMessage.textContent =
            "No saved bills yet.";

        return;

    }


    historyMessage.textContent =
        history.length +
        " saved bill" +
        (
            history.length === 1
                ? ""
                : "s"
        );


    history.forEach(
        function (bill) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "bill-history-item";


            /*
                BILL TITLE
            */

            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
                "🧾 " +
                bill.name;


            /*
                DATE
            */

            const date =
                document.createElement(
                    "p"
                );

            date.textContent =
                "📅 " +
                formatHistoryDate(
                    bill.date
                );


            /*
                SUMMARY
            */

            const summary =
                document.createElement(
                    "p"
                );

            summary.textContent =
                "👥 " +
                bill.participants.length +
                " people   •   💰 ₦" +
                bill.total.toLocaleString();


            /*
                ACTION AREA
            */

            const actions =
                document.createElement(
                    "div"
                );

            actions.className =
                "history-actions";


            /*
                VIEW BUTTON
            */

            const viewButton =
                document.createElement(
                    "button"
                );

            viewButton.textContent =
                "👁️ View";


            viewButton.addEventListener(
                "click",
                function () {

                    loadSavedBill(
                        bill.id
                    );

                }
            );


            /*
                RECEIPT BUTTON
            */

            const receiptButton =
                document.createElement(
                    "button"
                );

            receiptButton.textContent =
                "🧾 Receipt";


            receiptButton.addEventListener(
                "click",
                function () {

                    loadSavedBill(
                        bill.id,
                        true
                    );

                }
            );


            /*
                DELETE BUTTON
            */

            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.textContent =
                "🗑️ Delete";

            deleteButton.className =
                "delete";


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteSavedBill(
                        bill.id
                    );

                }
            );


            actions.appendChild(
                viewButton
            );

            actions.appendChild(
                receiptButton
            );

            actions.appendChild(
                deleteButton
            );


            card.appendChild(
                title
            );

            card.appendChild(
                date
            );

            card.appendChild(
                summary
            );

            card.appendChild(
                actions
            );


            billHistory.appendChild(
                card
            );

        }
    );

}


/* =========================
   FORMAT HISTORY DATE
========================= */

function formatHistoryDate(
    date
) {

    try {

        return new Date(
            date
        ).toLocaleString();

    }

    catch (error) {

        return "Unknown date";

    }

}


/* =========================
   LOAD SAVED BILL
========================= */

function loadSavedBill(
    id,
    openReceipt = false
) {

    const history =
        getSavedBills();


    const bill =
        history.find(
            item =>
                item.id === id
        );


    if (!bill) {

        alert(
            "This saved bill could not be found."
        );

        return;

    }


    /*
        Restore the bill.
    */

    participants =
        JSON.parse(
            JSON.stringify(
                bill.participants
            )
        );


    expenses =
        JSON.parse(
            JSON.stringify(
                bill.expenses
            )
        );


    editingExpense =
        null;


    billName.value =
        bill.name;


    addExpenseBtn.textContent =
        "Add Expense";


    /*
        Refresh the application.
    */

    updateParticipants();

    displayExpenses();


    /*
        Calculate the restored bill.
    */

    calculateBill();


    /*
        Generate the receipt if requested.
    */

    if (openReceipt) {

        setTimeout(
            function () {

                generateReceipt();

            },
            300
        );

    }


    /*
        Bring user back to the
        main bill area.
    */

    window.scrollTo({

        top: 0,

        behavior:
            "smooth"

    });


    alert(
        "Bill loaded successfully! ✅"
    );

}


/* =========================
   DELETE SAVED BILL
========================= */

function deleteSavedBill(
    id
) {

    const history =
        getSavedBills();


    const bill =
        history.find(
            item =>
                item.id === id
        );


    if (!bill) {
        return;
    }


    const answer =
        confirm(
            "Delete \"" +
            bill.name +
            "\" from Bill History?"
        );


    if (!answer) {
        return;
    }


    const updatedHistory =
        history.filter(
            item =>
                item.id !== id
        );


    localStorage.setItem(
        BILL_HISTORY_KEY,
        JSON.stringify(
            updatedHistory
        )
    );


    displayBillHistory();

}


/* =========================
   CLEAR ALL HISTORY
========================= */

if (clearHistoryBtn) {

    clearHistoryBtn.addEventListener(
        "click",
        function () {

            const history =
                getSavedBills();


            if (
                history.length === 0
            ) {

                alert(
                    "There are no saved bills to clear."
                );

                return;

            }


            const answer =
                confirm(
                    "Are you sure you want to delete ALL saved bills?"
                );


            if (!answer) {
                return;
            }


            localStorage.removeItem(
                BILL_HISTORY_KEY
            );


            displayBillHistory();


            alert(
                "Bill History has been cleared."
            );

        }
    );

}


/* =========================
   CONNECT SAVE BUTTON
========================= */

/*
    We keep your existing Save Bill
    button, but now it also stores
    the complete bill.
*/

saveBillBtn.addEventListener(
    "click",
    function () {

        /*
            Save the complete bill after
            the normal validation.
        */

        setTimeout(
            function () {

                saveBillToHistory();

            },
            50
        );

    }
);


/* =========================
   INITIALISE HISTORY
========================= */

displayBillHistory();
/* =================================================
   PROFESSIONAL DASHBOARD
================================================= */

const dashboardBills =
    document.getElementById(
        "dashboardBills"
    );

const dashboardAmount =
    document.getElementById(
        "dashboardAmount"
    );

const dashboardPeople =
    document.getElementById(
        "dashboardPeople"
    );

const dashboardNewBillBtn =
    document.getElementById(
        "dashboardNewBillBtn"
    );

const dashboardHistoryBtn =
    document.getElementById(
        "dashboardHistoryBtn"
    );


/* =========================
   DASHBOARD UPDATE
========================= */

function updateDashboard() {

    const history =
        getSavedBillsForDashboard();


    /*
        Total number of saved bills.
    */

    const numberOfBills =
        history.length;


    /*
        Total amount across
        all saved bills.
    */

    let totalMoney = 0;


    /*
        Total number of people
        represented across bills.
    */

    let totalPeople = 0;


    history.forEach(
        function (bill) {

            totalMoney +=
                Number(
                    bill.total || 0
                );


            totalPeople +=
                Array.isArray(
                    bill.participants
                )
                    ? bill.participants.length
                    : 0;

        }
    );


    dashboardBills.textContent =
        numberOfBills.toLocaleString();


    dashboardAmount.textContent =
        "₦" +
        totalMoney.toLocaleString();


    dashboardPeople.textContent =
        totalPeople.toLocaleString();

}


/* =========================
   READ BILL HISTORY
========================= */

function getSavedBillsForDashboard() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "billSplitHistory"
            )
        ) || [];

    }

    catch (error) {

        console.error(
            "Dashboard history error:",
            error
        );

        return [];

    }

}


/* =========================
   CREATE NEW BILL
========================= */

if (
    dashboardNewBillBtn
) {

    dashboardNewBillBtn.addEventListener(
        "click",
        function () {

            /*
                Use the existing New Bill
                button so we don't create
                a second reset system.
            */

            if (
                newBillBtn
            ) {

                newBillBtn.click();

            }

        }
    );

}


/* =========================
   OPEN BILL HISTORY
========================= */

if (
    dashboardHistoryBtn
) {

    dashboardHistoryBtn.addEventListener(
        "click",
        function () {

            const historySection =
                document.getElementById(
                    "billHistorySection"
                );


            if (
                historySection
            ) {

                historySection.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            }

            else {

                alert(
                    "Bill History will appear here after the history section is added."
                );

            }

        }
    );

}


/* =========================
   KEEP DASHBOARD UPDATED
========================= */

updateDashboard();


/*
    Refresh the dashboard when the
    user returns to the page.
*/

window.addEventListener(
    "focus",
    function () {

        updateDashboard();

    }
);
/* =================================================
   ADVANCED RECEIPT SHARING
================================================= */

const copyReceiptBtn =
    document.getElementById(
        "copyReceiptBtn"
    );

const whatsappShareBtn =
    document.getElementById(
        "whatsappShareBtn"
    );

const facebookShareBtn =
    document.getElementById(
        "facebookShareBtn"
    );

const xShareBtn =
    document.getElementById(
        "xShareBtn"
    );

const emailShareBtn =
    document.getElementById(
        "emailShareBtn"
    );

const socialSharePanel =
    document.getElementById(
        "socialSharePanel"
    );


/* =========================
   RECEIPT TEXT
========================= */

function getReceiptShareText() {

    const number =
        document.getElementById(
            "receiptNumber"
        )
        .textContent
        .trim();


    const name =
        document.getElementById(
            "receiptBillName"
        )
        .textContent
        .trim();


    const total =
        document.getElementById(
            "receiptTotal"
        )
        .textContent
        .trim();


    const people =
        document.getElementById(
            "receiptPeople"
        )
        .textContent
        .trim();


    return (
        "🧾 BillSplit Receipt\n\n" +

        "Bill: " +
        name +
        "\n" +

        "Receipt: " +
        number +
        "\n" +

        "Total: " +
        total +
        "\n" +

        "Participants: " +
        people +
        "\n\n" +

        "Split expenses. Settle easily."
    );

}


/* =========================
   SHOW / HIDE SHARE PANEL
========================= */

shareReceiptBtn.addEventListener(
    "click",
    async function () {

        /*
            Show the social sharing
            options.
        */

        socialSharePanel.classList.toggle(
            "show"
        );


        /*
            On devices supporting the
            native share menu, also try
            the actual receipt file.
        */

        if (
            navigator.share &&
            navigator.canShare
        ) {

            try {

                const blob =
                    await createReceiptBlob();


                const file =
                    new File(
                        [
                            blob
                        ],

                        getReceiptFileName(),

                        {
                            type:
                                "image/jpeg"
                        }

                    );


                if (
                    navigator.canShare({
                        files: [
                            file
                        ]
                    })
                ) {

                    /*
                        Do not automatically
                        open the share menu.

                        The user can now choose
                        one of the social buttons
                        or use the native sharing
                        options we already support.
                    */

                    console.log(
                        "Receipt file sharing is supported."
                    );

                }

            }

            catch (error) {

                console.log(
                    "Native share preparation skipped."
                );

            }

        }

    }
);


/* =========================
   COPY RECEIPT DETAILS
========================= */

copyReceiptBtn.addEventListener(
    "click",
    async function () {

        const text =
            getReceiptShareText();


        try {

            await navigator.clipboard.writeText(
                text
            );


            const original =
                copyReceiptBtn.textContent;


            copyReceiptBtn.textContent =
                "✅ Copied!";


            setTimeout(
                function () {

                    copyReceiptBtn.textContent =
                        original;

                },
                1800
            );

        }

        catch (error) {

            /*
                Fallback for older browsers.
            */

            const textarea =
                document.createElement(
                    "textarea"
                );


            textarea.value =
                text;


            document.body.appendChild(
                textarea
            );


            textarea.select();


            document.execCommand(
                "copy"
            );


            textarea.remove();


            alert(
                "Receipt details copied successfully."
            );

        }

    }
);


/* =========================
   WHATSAPP
========================= */

whatsappShareBtn.addEventListener(
    "click",
    function () {

        const text =
            encodeURIComponent(
                getReceiptShareText()
            );


        window.open(
            "https://wa.me/?text=" +
            text,

            "_blank"
        );

    }
);


/* =========================
   FACEBOOK
========================= */

facebookShareBtn.addEventListener(
    "click",
    function () {

        const text =
            encodeURIComponent(
                getReceiptShareText()
            );


        /*
            Facebook's sharing page
            accepts a URL.

            Since the app is currently
            running locally, the user can
            still use the receipt JPG
            downloaded from BillSplit.
        */

        window.open(
            "https://www.facebook.com/sharer/sharer.php?quote=" +
            text,

            "_blank",

            "width=650,height=500"
        );

    }
);


/* =========================
   X / TWITTER
========================= */

xShareBtn.addEventListener(
    "click",
    function () {

        const text =
            encodeURIComponent(
                getReceiptShareText()
            );


        window.open(
            "https://twitter.com/intent/tweet?text=" +
            text,

            "_blank",

            "width=650,height=500"
        );

    }
);


/* =========================
   EMAIL
========================= */

emailShareBtn.addEventListener(
    "click",
    function () {

        const subject =
            encodeURIComponent(
                "BillSplit Receipt"
            );


        const body =
            encodeURIComponent(
                getReceiptShareText()
            );


        window.location.href =
            "mailto:?subject=" +
            subject +
            "&body=" +
            body;

    }
);