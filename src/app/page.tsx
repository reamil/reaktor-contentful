import ReaktorianListing from '@reaktor-contentful/app/reaktorians/ReaktorianListing/ReaktorianListing';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ReaktorianListing />
    </main>
  );
}
