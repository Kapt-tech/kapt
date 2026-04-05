import Image from 'next/image';
import { Camera, Zap, FileCheck, ShieldCheck } from 'lucide-react';

export default function SobrePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* HERO SECTION */}
            <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center border-b border-white/5 py-32">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop" 
                        alt="Runner at sunrise"
                        className="w-full h-full object-cover opacity-30 mix-blend-luminosity brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-asphaltBlack via-asphaltBlack/80 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 text-center flex flex-col items-center gap-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-actionVolt tracking-tighter uppercase leading-[0.9]">
                        A NOSSA HISTÓRIA:<br/>
                        CONECTANDO<br/>
                        EMOÇÃO E<br/>
                        PERFORMANCE
                    </h1>
                    
                    <p className="max-w-2xl text-zinc-300 text-sm md:text-base font-light tracking-wide mx-auto font-mono mt-4">
                        Nascemos do desejo de eternizar o esforço. Cada gota de suor, cada superação, 
                        capturada com a precisão que o atleta merece. Somos o seu arquivo cinético.
                    </p>
                </div>
            </section>

            {/* ESTATÍSTICAS SECTION */}
            <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 border-b border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Left: Image */}
                    <div className="relative w-full aspect-square md:aspect-[4/5] p-2 ring-1 ring-white/10 bg-zinc-900 overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1907&auto=format&fit=crop" 
                            alt="Esportes de areia"
                            className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    
                    {/* Right: Text Stats */}
                    <div className="flex flex-col gap-12">
                        <div className="font-mono text-actionVolt font-bold tracking-widest text-xs uppercase mb-4">
                            Estatísticas
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <span className="text-6xl md:text-8xl font-black text-white tracking-tighter">12M+</span>
                            <span className="font-mono text-zinc-400 text-xs tracking-widest uppercase">Fotos Capturadas</span>
                        </div>
                        
                        <div className="flex flex-col gap-2 mt-4">
                            <span className="text-6xl md:text-8xl font-black text-white tracking-tighter">840+</span>
                            <span className="font-mono text-zinc-400 text-xs tracking-widest uppercase">Eventos Cobertos</span>
                        </div>

                        <p className="text-zinc-500 text-sm md:text-base font-light tracking-wide mt-8 border-l border-actionVolt pl-6">
                            A KAPT une a tecnologia da inteligência artificial com o olhar apurado de fotógrafos apaixonados. 
                            Não apenas registramos eventos; documentamos legados esportivos em tempo real.
                        </p>
                    </div>
                </div>
            </section>

            {/* FOTÓGRAFOS SECTION */}
            <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 border-b border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Left: Text */}
                    <div className="flex flex-col gap-8 order-2 md:order-1">
                        <div className="font-mono text-actionVolt font-bold tracking-widest text-xs uppercase bg-actionVolt/10 self-start px-2 py-1">
                            Real-time
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9] italic">
                            FOTÓGRAFOS QUE <br/>
                            <span className="text-actionVolt">RESPIRAM ESPORTE</span>
                        </h2>

                        <div className="flex flex-col gap-6 text-zinc-400 text-sm md:text-base font-light tracking-wide">
                            <p>
                                Nossa rede é composta por especialistas que entendem o movimento. Sabemos exatamente 
                                o momento de clicar para captar o auge da performance.
                            </p>
                            <p>
                                Equipados com os melhores ferramentais integrados à nossa plataforma de entregas instantânea, 
                                garantimos que a sua melhor foto esteja na sua mão antes mesmo de você sair da arena.
                            </p>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="relative w-full aspect-square md:aspect-[4/5] p-2 ring-2 ring-actionVolt/50 bg-zinc-900 overflow-hidden order-1 md:order-2">
                        <img 
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
                            alt="Fotógrafo em ação / Atleta Crossfit"
                            className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700 pointer-events-none"
                        />
                    </div>
                </div>
            </section>

            {/* PILARES SECTION */}
            <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 border-b border-white/5 flex flex-col items-center">
                <div className="text-center flex flex-col items-center gap-4 mb-20">
                    <span className="font-mono text-actionVolt font-bold tracking-widest text-xs uppercase">Filosofia</span>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">NOSSOS PILARES</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {/* Pilar 1 */}
                    <div className="bg-zinc-900/50 ring-1 ring-white/10 hover:ring-actionVolt/50 p-10 flex flex-col gap-6 border-l-2 border-actionVolt transition-all">
                        <div className="w-10 h-10 bg-actionVolt/10 flex items-center justify-center text-actionVolt">
                            <Zap size={20} />
                        </div>
                        <h3 className="text-xl font-bold tracking-tighter uppercase text-white mt-4">RAPIDEZ BIOMÉTRICA</h3>
                        <p className="text-sm text-zinc-500 font-light leading-relaxed">
                            Localize suas fotos em segundos usando nosso reconhecimento facial de alta precisão. 
                            O tempo de busca acabou.
                        </p>
                    </div>

                    {/* Pilar 2 */}
                    <div className="bg-zinc-900/50 ring-1 ring-white/10 hover:ring-actionVolt/50 p-10 flex flex-col gap-6 border-l-2 border-actionVolt transition-all">
                        <div className="w-10 h-10 bg-actionVolt/10 flex items-center justify-center text-actionVolt">
                            <FileCheck size={20} />
                        </div>
                        <h3 className="text-xl font-bold tracking-tighter uppercase text-white mt-4">QUALIDADE PROFISSIONAL</h3>
                        <p className="text-sm text-zinc-500 font-light leading-relaxed">
                            Imagens em alta definição, curradas editorialmente para valorizar cada detalhe do 
                            seu desempenho.
                        </p>
                    </div>

                    {/* Pilar 3 */}
                    <div className="bg-zinc-900/50 ring-1 ring-white/10 hover:ring-actionVolt/50 p-10 flex flex-col gap-6 border-l-2 border-actionVolt transition-all">
                        <div className="w-10 h-10 bg-actionVolt/10 flex items-center justify-center text-actionVolt">
                            <ShieldCheck size={20} />
                        </div>
                        <h3 className="text-xl font-bold tracking-tighter uppercase text-white mt-4">CONEXÃO SEGURA</h3>
                        <p className="text-sm text-zinc-500 font-light leading-relaxed">
                            Integridade máxima na proteção da imagem. Suas memórias esportivas preservadas no maior arquivo cinético do país.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-32 pb-40 flex flex-col items-center justify-center text-center gap-12">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                    FAÇA PARTE DO <span className="text-actionVolt">ARQUIVO<br/> CINÉTICO</span>
                </h2>
                
                <button className="bg-actionVolt text-black text-sm md:text-base font-black px-12 py-5 rounded-md uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(206,255,0,0.3)] hover:shadow-[0_0_40px_rgba(206,255,0,0.5)]">
                    Quero Fotografar
                </button>
            </section>
        </div>
    );
}
