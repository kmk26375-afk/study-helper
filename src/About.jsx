// Change these details to your own.
const ME = {
  name: "Mohit",
  branch: "Computer",
  about: "I made this website for diploma students, so notes, lecture videos and old question papers are in one place.",
  instagram: "https://instagram.com/your_username",
  facebook: "https://facebook.com/your_username",
};

export default function About() {
  return (
    <section>
      <h2>About</h2>
      <div className="panel">
        <p>Hi, I am <strong>{ME.name}</strong>, a student of the {ME.branch} branch.</p>
        <p>{ME.about}</p>
        <p className="links">
          <a href={ME.instagram} target="_blank" rel="noreferrer">Instagram page</a>
          <a href={ME.facebook} target="_blank" rel="noreferrer">Facebook page</a>
        </p>
      </div>
    </section>
  );
}
