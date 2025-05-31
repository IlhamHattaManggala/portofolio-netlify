import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { card } from "../components/constant";
import { useState } from "react";
import type { IconType } from "react-icons";
import { templates, badgeOptions } from "../components/constant/templates";

const ReadmeGenerator = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Templates");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [previewHTML, setPreviewHTML] = useState<string>("");
  const [originalHTML, setOriginalHTML] = useState<string>("");
  const [selectedBadgeIndex, setSelectedBadgeIndex] = useState<number | null>(
    null
  );

  // Fungsi kembali ke halaman utama
  const goBack = () => navigate("/");

  // Fungsi untuk convert HTML ke Markdown (simple)
  function htmlToMarkdown(container: HTMLElement): string {
    return container.innerText
      .replace(/^### (.*$)/gim, "### $1")
      .replace(/^## (.*$)/gim, "## $1")
      .replace(/^# (.*$)/gim, "# $1")
      .replace(/\*\*(.*?)\*\*/gim, "**$1**")
      .replace(/\*(.*?)\*/gim, "*$1*")
      .replace(/!\[(.*?)\]\((.*?)\)/gim, "![Alt text]($2)")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "[$1]($2)");
  }

  // Saat klik salah satu template
  const handleTemplateSelect = (id: number) => {
    const template = templates.find((t) => t.id === id);
    if (!template) return;
    setSelectedTemplate(id);
    setPreviewHTML(template.content ?? "");
    setOriginalHTML(template.content ?? "");
    setSelectedBadgeIndex(null); // reset badge selection saat ganti template
  };

  // Tambah badge di awal konten preview
  const handleAddBadge = (badgeUrl: string) => {
    const div = document.createElement("div");
    div.innerHTML = previewHTML;

    // Cari elemen .card di dalam preview HTML
    let cardDiv = div.querySelector(".card") as HTMLElement | null;

    // Kalau .card ga ada, buat dulu dan tambahkan di dalam konten utama (misal di div utama)
    if (!cardDiv) {
      cardDiv = document.createElement("div");
      cardDiv.className = "card";
      // Bisa styling cardDiv jika perlu, contoh:
      // cardDiv.style.display = "flex";
      // cardDiv.style.gap = "8px";

      // Tambahkan cardDiv ke dalam container utama,
      // misal di dalam div pertama, atau langsung di div
      // Asumsi div punya satu child utama: misal div pertama anak div
      const mainContainer = div.querySelector("div.text-center") || div;
      mainContainer.appendChild(cardDiv);
    }

    // Buat elemen img baru untuk badge
    const newImg = document.createElement("img");
    newImg.src = badgeUrl;
    newImg.alt = "badge";
    newImg.style.height = "16px";
    newImg.style.cursor = "pointer";
    newImg.className = "inline my-4"; // sesuai style badge kamu

    // Tambahkan img ke dalam cardDiv
    cardDiv.appendChild(newImg);

    // Update previewHTML dengan perubahan baru
    setPreviewHTML(div.innerHTML);
  };

  // Ganti badge yang sudah dipilih
  const handleBadgeReplace = (badgeUrl: string) => {
    if (selectedBadgeIndex === null) return;
    const div = document.createElement("div");
    div.innerHTML = previewHTML;
    const imgs = div.querySelectorAll("img");
    if (imgs[selectedBadgeIndex]) {
      imgs[selectedBadgeIndex].src = badgeUrl;
      setPreviewHTML(div.innerHTML);
      setSelectedBadgeIndex(null);
    }
  };

  // Hapus badge yang sudah dipilih
  const handleBadgeDelete = () => {
    if (selectedBadgeIndex === null) return;
    const div = document.createElement("div");
    div.innerHTML = previewHTML;
    const imgs = div.querySelectorAll("img");
    if (imgs[selectedBadgeIndex]) {
      imgs[selectedBadgeIndex].remove();
      setPreviewHTML(div.innerHTML);
      setSelectedBadgeIndex(null);
    }
  };

  // Batalkan edit, kembalikan ke konten awal template
  const handleCancelEdit = () => {
    if (window.confirm("Apakah kamu yakin ingin membatalkan perubahan?")) {
      setPreviewHTML(originalHTML);
      setSelectedBadgeIndex(null);
    }
  };

  // Batalkan edit badge (hilangkan selection)
  const handleCancelBadgeEdit = () => {
    setSelectedBadgeIndex(null);
  };

  return (
    <section className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="w-full shadow px-6 py-4 flex justify-between items-center bg-gray-800">
        <h2 className="text-xl font-semibold">Profile Readme Generator</h2>
        <button onClick={goBack} className="text-blue-400 hover:underline">
          Beranda
        </button>
      </nav>

      {/* Konten utama */}
      <div className="flex-grow p-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Sidebar kiri menu */}
          <aside className="md:col-span-2 bg-gray-800 rounded-xl p-4 space-y-4 shadow-inner">
            {card.map((item, index) => {
              const Icon = item.icon as IconType;
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (
                      item.name === selectedMenu &&
                      item.name === "Templates"
                    ) {
                      // Reset template jika Templates diklik ulang
                      setSelectedTemplate(null);
                      setPreviewHTML("");
                      setOriginalHTML("");
                      setSelectedBadgeIndex(null);
                    }
                    setSelectedMenu(item.name ?? "");
                  }}
                  className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition ${
                    selectedMenu === item.name
                      ? "bg-blue-600"
                      : "bg-gray-700 hover:bg-blue-600"
                  }`}
                >
                  <Icon className="text-xl" />
                  <span className="text-sm">{item.name}</span>
                </div>
              );
            })}
          </aside>

          {/* Live Preview tengah */}
          <div className="md:col-span-6 bg-gray-800 rounded-xl p-6 shadow-lg relative min-h-[400px] overflow-auto">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">Live Preview</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(previewHTML);
                    alert("Konten berhasil disalin!");
                  }}
                  className="text-sm bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
                >
                  Copy HTML
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-sm bg-red-600 px-4 py-1 rounded hover:bg-red-700"
                >
                  Batal Edit
                </button>
              </div>
            </div>

            {/* Konten preview yang bisa diedit */}
            <div
              className="prose prose-invert max-w-full text-sm"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setPreviewHTML(e.currentTarget.innerHTML)}
              dangerouslySetInnerHTML={{ __html: previewHTML }}
              onClick={(e) => {
                // Cek apakah klik di badge img, dan pilih index badge
                const imgs = Array.from(
                  (e.currentTarget as HTMLElement).querySelectorAll("img")
                );
                const index = imgs.findIndex((img) => img === e.target);
                if (index !== -1) {
                  setSelectedBadgeIndex(index);
                } else {
                  setSelectedBadgeIndex(null);
                }
              }}
            />

            {/* Tombol simpan markdown */}
            <button
              onClick={() => {
                const tempElement = document.createElement("div");
                tempElement.innerHTML = previewHTML;
                const markdown = htmlToMarkdown(tempElement);
                const blob = new Blob([markdown], { type: "text/markdown" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "README.md";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="absolute bottom-4 right-4 text-sm bg-green-600 px-4 py-2 rounded hover:bg-green-700 shadow"
            >
              Save as Markdown
            </button>
          </div>

          {/* Sidebar kanan untuk badge / template selection */}
          {selectedBadgeIndex !== null ? (
            // Jika klik badge di preview, tampilkan opsi edit badge
            <div className="md:col-span-4 border rounded p-4 bg-gray-800 text-white">
              <h3 className="text-lg font-bold mb-4">Ganti Badge</h3>

              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handleBadgeDelete}
                  className="text-sm text-white bg-red-600 hover:bg-red-500 px-4 py-1.5 rounded-full transition cursor-pointer"
                >
                  Hapus Badge
                </button>
                <button
                  onClick={handleCancelBadgeEdit}
                  className="text-sm text-white bg-blue-700 hover:bg-blue-600 px-4 py-1.5 rounded-full transition cursor-pointer"
                >
                  Batal Edit Badge
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {badgeOptions.map((badge, i) => (
                  <button
                    key={i}
                    onClick={() => handleBadgeReplace(badge.img)}
                    className="flex items-center gap-2 p-2 bg-gray-600 rounded hover:bg-blue-600 cursor-pointer"
                  >
                    <img
                      src={badge.img}
                      className="w-full"
                      alt={`badge-${i}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : selectedTemplate ? (
            // Jika sudah pilih template tapi belum klik badge, tampilkan opsi tambah badge
            <div className="md:col-span-4 border rounded p-4 bg-gray-800 text-white">
              <h3 className="text-lg font-bold mb-4">Tambahkan Badge</h3>
              <div className="grid grid-cols-2 gap-2">
                {badgeOptions.map((badge, i) => (
                  <button
                    key={i}
                    onClick={() => handleAddBadge(badge.img)}
                    className="flex items-center gap-2 p-2 bg-gray-600 rounded hover:bg-green-600 cursor-pointer"
                  >
                    <img
                      src={badge.img}
                      className="w-full"
                      alt={`badge-add-${i}`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Klik badge untuk menambahkannya ke dalam preview. Badge akan
                muncul di awal konten.
              </p>
            </div>
          ) : (
            // Jika belum pilih template, tampilkan pilihan template
            <div className="md:col-span-4 border rounded p-4 bg-gray-800 text-white">
              <h3 className="text-lg font-bold mb-4">Select Template</h3>
              <div className="grid grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 text-center rounded-md cursor-pointer transition ${
                      selectedTemplate === template.id
                        ? "bg-blue-500"
                        : "bg-gray-700 hover:bg-blue-500"
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    {template.id}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-6">
                Setelah memilih template, kamu bisa langsung mengedit isi
                preview di tengah.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ReadmeGenerator;
