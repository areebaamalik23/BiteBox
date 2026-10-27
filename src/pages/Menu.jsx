import PageHeader from '../components/PageHeader.jsx'
import MenuBrowser from '../components/MenuBrowser.jsx'

export default function Menu() {
  return (
    <>
      <PageHeader eyebrow="The full menu" title="Our menu" sub="33 dishes across 11 categories. Search, filter and sort to find your next meal." />
      <section className="container page-body"><MenuBrowser syncUrl /></section>
    </>
  )
}
