import Link from 'next/link'

export function Banner() {
  return (
    <section className="flex flex-col bg-black items-center w-full px-4 py-8 md:py-16">
      <aside className="flex h-11 w-full max-w-[320px] items-center gap-x-2 rounded-full bg-gray-800/50 pl-4 pr-2">
        <span className="text-gray-400">Upcoming</span>
        <span className="text-gray-300">→</span>
        <span className="text-gray-300 truncate">
          2024 Taipei Blockchain Week
        </span>
        <Link
          target="_blank"
          href="https://dorahacks.io/hackathon/tbw2024/detail"
          className="ml-auto flex-shrink-0 rounded-full bg-purple-500 px-4 py-1 text-sm text-white hover:bg-purple-600"
        >
          Go
        </Link>
      </aside>

      <header className="relative w-full max-w-[490px] py-8 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl" />
        <h1 className="relative bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-4xl md:text-7xl font-bold text-transparent">
          <span className="block">JakeKuo</span>
          <span className="block">for Web3</span>
        </h1>
      </header>

      <article className="w-full max-w-[550px] px-4 text-center">
        <p className="text-lg md:text-2xl text-gray-300">
          Web3 Developers, Founders & Everyone.
        </p>
        <p className="mt-2 text-base md:text-lg text-gray-400">
          Based in Taiwan
        </p>
      </article>
    </section>
  )
}
