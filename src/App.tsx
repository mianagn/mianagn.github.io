import { Header } from './components/ui/header-2'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div
      className="text-zinc-900 min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #FAFAFA 0%, #F8F8F9 40%, #F5FDFB 100%)',
      }}
    >
      <Header />
      <main>
        <Hero />
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        </div>
        <About />
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        </div>
        <Projects />
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        </div>
        <Services />
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        </div>
        <Experience />
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
