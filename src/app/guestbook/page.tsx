import { supabase } from "@/lib/supabase";
import { MessageSquare, Terminal } from "lucide-react";
import { GuestbookForm } from "@/components/guestbook-form";

export const metadata = {
  title: "Guestbook | Ashu Meena",
  description: "Sign my guestbook and leave a message!",
};

export default async function GuestbookPage() {
  const { data: entries } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] font-mono p-8 pt-32 pb-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--accent)] to-white mb-4 flex items-center gap-4">
            <MessageSquare className="w-10 h-10 text-[color:var(--accent)]" />
            Guestbook
          </h1>
          <p className="text-[color:var(--muted-foreground)] text-lg border-l-4 border-[color:var(--magenta)] pl-4">
            Leave a trace in the system. Drop a message, say hi, or share your thoughts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <GuestbookForm />
          </div>

          <div className="md:col-span-2 flex flex-col gap-6">
            {entries && entries.length > 0 ? (
              entries.map(entry => (
                <div key={entry.id} className="border border-[color:var(--border)] p-6 bg-black relative group" style={{ clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)" }}>
                  <div className="flex items-start gap-4 mb-4">
                    <img src={entry.user_avatar} alt={entry.user_name} className="w-12 h-12 bg-[color:var(--secondary)] rounded-none border border-[color:var(--border)]" />
                    <div>
                      <h3 className="text-white font-bold text-lg">{entry.user_name}</h3>
                      <p className="text-xs text-[color:var(--muted-foreground)] uppercase tracking-widest">{new Date(entry.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-[color:var(--muted-foreground)] whitespace-pre-wrap">{entry.message}</p>
                </div>
              ))
            ) : (
              <div className="border border-[color:var(--border)] p-12 text-center text-[color:var(--muted-foreground)] uppercase tracking-widest bg-black flex flex-col items-center gap-4">
                <Terminal className="w-8 h-8 opacity-50" />
                No messages yet. Be the first to initialize the log!
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
