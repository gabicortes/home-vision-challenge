import { AppHeader } from './components/AppHeader/AppHeader'
import { CardGrid } from './components/CardGrid/CardGrid'
import { mockHouses } from './data/mockHouses'

function App() {
  return (
    <div className="min-h-screen bg-background-page">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1400px] px-5 pt-6 pb-8">
        <CardGrid items={mockHouses} />
      </main>
    </div>
  )
}

export default App
