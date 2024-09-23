// Function to update the live preview
function updatePreview() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const includeSignature = document.getElementById("includeSignature").checked;

    // Update the preview fields
    document.getElementById("previewName").textContent = name ? name : "[Your name]";
    document.getElementById("previewEmail").textContent = email ? email : "[Your email]";
    document.getElementById("previewMessage").textContent = message ? message : "[Your message]";

    // Show or hide the signature section
    if (includeSignature) {
        document.getElementById("signatureSection").style.display = "block";
    } else {
        document.getElementById("signatureSection").style.display = "none";
    }
}

// Function to download the preview content as a .docx file
function downloadFile() {
    const { Document, Packer, Paragraph, TextRun } = window.docx;

    // Create a new Word document
    const doc = new Document();

    // Add paragraphs with the preview content
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun("Name: " + document.getElementById("previewName").textContent),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun("Email: " + document.getElementById("previewEmail").textContent),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun("Message: " + document.getElementById("previewMessage").textContent),
                ],
            }),
        ],
    });

    // Include signature if the checkbox is checked
    if (document.getElementById("includeSignature").checked) {
        doc.addSection({
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Signature: [Your signature]"),
                    ],
                }),
            ],
        });
    }

    // Generate the .docx file and trigger download
    Packer.toBlob(doc).then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "generated-document.docx"; // The file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}