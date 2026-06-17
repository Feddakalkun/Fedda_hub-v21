import { APP_VERSION_LABEL, HOME_MODULES } from '../../modules/registry';

interface RichHomeProps {
  onSelect: (id: string) => void;
}

export const RichHome = ({ onSelect }: RichHomeProps) => {
  const cards = HOME_MODULES.filter((module) => module.card);
  const topCards = cards.slice(0, 2);
  const bottomCards = cards.slice(2);

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-[#050506]">
      <div className="mx-auto flex min-h-full w-full max-w-[1500px] flex-col px-8 py-8">
        <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="v14-kicker text-white/40">{APP_VERSION_LABEL}</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">Local AI studio</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Image, video, gallery, character packs and Ollama model management in one workspace.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-white/45">
            Modular core + booster packs
          </div>
        </section>

        <section className="space-y-4">
          <div className="mx-auto grid max-w-[980px] gap-4 md:grid-cols-2">
            {topCards.map((module) => (
              <button
                key={module.id}
                onClick={() => onSelect(module.defaultTab)}
                aria-label={module.label}
                className="group relative aspect-[1168/784] overflow-hidden rounded-lg border border-white/10 bg-[#08090d] transition-all hover:-translate-y-0.5 hover:border-white/25"
              >
                <img
                  src={module.card?.poster}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                {module.card?.video ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                    src={module.card.video}
                    poster={module.card.poster}
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : null}
              </button>
            ))}
          </div>

          <div className={`mx-auto grid gap-4 ${bottomCards.length > 3 ? 'max-w-[1320px] md:grid-cols-4' : 'max-w-[1240px] md:grid-cols-3'}`}>
            {bottomCards.map((module) => (
              <button
                key={module.id}
                onClick={() => onSelect(module.defaultTab)}
                aria-label={module.label}
                className="group relative aspect-[1168/784] overflow-hidden rounded-lg border border-white/10 bg-[#08090d] transition-all hover:-translate-y-0.5 hover:border-white/25"
              >
                <img
                  src={module.card?.poster}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                {module.card?.video ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                    src={module.card.video}
                    poster={module.card.poster}
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : null}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
