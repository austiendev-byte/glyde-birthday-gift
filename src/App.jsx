import HeroSection from './sections/HeroSection'
import MemoriesSection from './sections/MemoriesSection'
import LoveLetterSection from './sections/LoveLetterSection'
import BirthdayCakeSection from './sections/BirthdayCakeSection'
import SectionTransition from './components/SectionTransition'
import FloatingMusicPlayer from './components/FloatingMusicPlayer'

export default function App() {
  return (
    <>
      <main>
        <HeroSection />
        <SectionTransition className="bg-snow" />
        <MemoriesSection />
        <LoveLetterSection />
        <BirthdayCakeSection />
      </main>
      <FloatingMusicPlayer />
    </>
  )
}
