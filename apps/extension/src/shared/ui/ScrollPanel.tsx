function Root({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      {children}
    </section>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <header className="relative z-10 shrink-0">{children}</header>;
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
      {children}
    </div>
  );
}

export const ScrollPanel = Object.assign(Root, {
  Header,
  Body,
});
