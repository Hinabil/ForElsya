async function submitHarapan(event) {
    event.preventDefault(); // Mencegah reload halaman

    const harapan = document.getElementById('harapan').value;

    if (!harapan) {
        alert("Harapan tidak boleh kosong!");
        return;
    }

    const data = `Harapan baru: ${harapan}\n`;

    const token = "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";  // Ganti dengan token GitHub kamu
    const repoOwner = "Hinabil";             // Ganti dengan username GitHub kamu
    const repoName = "ForElsya";            // Ganti dengan nama repositorimu
    const path = "harapan_elsya.txt";                    // File tempat data disimpan

    // Cek apakah file sudah ada
    const getUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
    const response = await fetch(getUrl);
    const fileData = await response.json();

    const content = fileData.content 
        ? atob(fileData.content) + data 
        : data;

    const body = {
        message: "Menambahkan harapan baru",
        content: btoa(content),
        sha: fileData.sha // SHA untuk mengupdate file jika sudah ada
    };

    // Kirim data ke GitHub
    fetch(getUrl, {
                method: "PUT",
                headers: {
                    "Authorization": `token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            .then(() => window.location.href = "sayang_nabil.html")
            .catch(err => alert("Gagal menyimpan harapan."));
        }
