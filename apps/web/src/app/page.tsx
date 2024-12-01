import { Banner, Footer, Navbar } from '../components'

export default function Home() {
  return (
    <main className="flex flex-col text-white bg-black">
      <Navbar />
      <Banner />
      <Footer />
    </main>
  )
}
