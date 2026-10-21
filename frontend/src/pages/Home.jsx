import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

function Home() {
  const studentName = "Your Name";
  const studentTitle = "Aspiring Machine Learning Engineer";
  const studentBio =
    "I'm a Computer Engineering student specializing in Data Science and Machine Learning. I build end-to-end ML systems — from data pipelines and model architecture to deployment — with a focus on turning research ideas into working, reliable products.";
  const skillsList = [
    "Python", "PyTorch", "Scikit-learn", "Pandas & NumPy",
    "SQL", "React", "Git & GitHub", "Data Visualization",
  ];

  return (
    <>
      <Header name={studentName} title={studentTitle} />
      <About bio={studentBio} />
      <Skills skills={skillsList} />
    </>
  );
}

export default Home;
