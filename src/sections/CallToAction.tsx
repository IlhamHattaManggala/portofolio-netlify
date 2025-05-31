import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const history = useNavigate();

  const goToReadmeGenerator = () => {
    history("/readme-generator");
  };

  return (
    <section className="w-full py-16 bg-blue-600 flex justify-center items-center">
      <div className="text-center text-white max-w-xl px-4">
        <h2 className="text-3xl font-bold mb-4">
          Buat Profile Readme kamu dengan mudah!
        </h2>
        <p className="mb-6 text-lg">
          Isi data profilmu dan dapatkan file Readme siap pakai.
        </p>
        <button
          onClick={goToReadmeGenerator}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-200 transition"
        >
          Mulai Sekarang
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
