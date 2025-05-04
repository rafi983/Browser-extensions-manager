import ExtensionsList from '@/components/ExtensionsList';
import FilterButtons from '@/components/ui/FilterButtons';

export default function Home() {
  return (
    <main>
      <section className='flex flex-col items-center gap-6 mb-10 sm:flex-row sm:justify-between sm:mb-8 sm:gap-0'>
        <h2 className='text-preset-1 text-center'>Extensions List</h2>
        <FilterButtons />
      </section>
      <section>
        <ExtensionsList />
      </section>
    </main>
  );
}
