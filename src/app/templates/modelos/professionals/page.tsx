export default function ProfessionalsPage() {
    return (
        <div className="bg-background font-display text-foreground antialiased">
            {/* Main Container */}
            <div className="relative mx-auto min-h-screen max-w-md bg-card shadow-2xl">
                {/* Sticky Top Bar */}
                <div className="sticky top-0 z-50 flex items-center justify-between bg-card/80 px-4 py-4 backdrop-blur-md dark:bg-slate-900/80">
                    <button className="flex size-10 items-center justify-center rounded-full bg-background text-foreground dark:bg-primary/10 dark:text-white">
                        <span className="material-symbols-outlined text-[22px]">arrow_back</span>
                    </button>
                    <h1 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Portfólio</h1>
                    <button className="flex size-10 items-center justify-center rounded-full bg-background text-foreground dark:bg-primary/10 dark:text-white">
                        <span className="material-symbols-outlined text-[22px]">share</span>
                    </button>
                </div>
                {/* Profile Header Section */}
                <div className="flex flex-col items-center px-6 pt-6 pb-8">
                    <div className="relative mb-4">
                        <div
                            className="size-32 overflow-hidden rounded-full border-4 border-white ring-2 ring-primary/20 transition-transform hover:scale-105"
                            data-alt="Professional portrait of a female architect smiling"
                            style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8FxnOO2Ru_GTQ0wtJHGdW3KSeVU9l1g0LI3Zgm4z_uE5KOBsXM2f4Y4mQ2UyBNQiuMVCVEyp09IZaqyyfup5_t5mqyJMJgO9aeRqZ9mdR2svcOhcdMWQgiHhJCvQhFLJ6oEk1fsr6P5nT6-yQlzQC3bCwZbGvk1ydHfazT5jgTTBAoUFXbkaSco1CVnN6I_HNXWOVPee4votnnTwt2ystP2nA4AFaXltRr2fCvrltnz6ax5jg-n0wgFAO7mC7GRN8uNs91yn1RGqu")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        ></div>
                        <div className="absolute bottom-1 right-1 flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white">
                            <span className="material-symbols-outlined text-[18px] font-bold">verified</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">Mariana Silva</h2>
                        <p className="mt-1 text-sm font-medium text-primary">Arquiteta &amp; Designer de Interiores</p>
                        <div className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-muted-foreground">
                            <span className="material-symbols-outlined text-xs">location_on</span>
                            <span>São Paulo, Brasil</span>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-6 flex w-full gap-3">
                        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
                            <span className="material-symbols-outlined text-sm">mail</span>
                            Solicitar Orçamento
                        </button>
                        <button className="flex size-[52px] items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary transition-colors hover:bg-primary/10">
                            <span className="material-symbols-outlined">language</span>
                        </button>
                    </div>
                </div>
                {/* Stats Overview */}
                <div className="mx-6 mb-8 flex items-center justify-around rounded-2xl bg-background/50 py-4 dark:bg-white/5">
                    <div className="text-center">
                        <p className="text-xl font-bold text-foreground">12</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Anos Exp.</p>
                    </div>
                    <div className="h-8 w-px bg-border"></div>
                    <div className="text-center">
                        <p className="text-xl font-bold text-foreground">150+</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Projetos</p>
                    </div>
                    <div className="h-8 w-px bg-border"></div>
                    <div className="text-center">
                        <p className="text-xl font-bold text-foreground">08</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Prêmios</p>
                    </div>
                </div>
                {/* Expertise Tags */}
                <div className="px-6 mb-8">
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">Arquitetura Sustentável</span>
                        <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">Design Minimalista</span>
                        <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">Reformas de Luxo</span>
                        <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">Consultoria</span>
                    </div>
                </div>
                {/* Portfolio Grid Section */}
                <div className="px-6 pb-20">
                    <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Destaques</h3>
                        <button className="text-xs font-bold text-primary">Ver todos</button>
                    </div>
                    {/* Masonry-like Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Project 1 */}
                        <div className="group relative overflow-hidden rounded-2xl bg-gray-100">
                            <img className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Modern minimalist living room interior design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0Q9WS7bOoXR_b6DaHWAI8U3P4N5_EBrdKg8te9i3G3vjBqYFMPkMDOT84FjSVbEB58cXm_DtiOtjVAqsXKEtxcfRreJVwjQT3oNdLHXlUQl5b5xyFqRgPELYBltWXC9VWGQmWZyQQZ4PHXULfMMGev5Vhvp-ODX7kPQpyOq8zmWmuuO0pTAhDJIoyzUNsLxpyH3fmbyRmuq-cELbQNIuVU6NoIZnBv8DZjRi8vx_yChvLnnZfI62kg1vC2Y35SA5zB6JaZgH33IqC" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                            <div className="absolute bottom-3 left-3 opacity-0 transition-opacity group-hover:opacity-100">
                                <p className="text-xs font-bold text-white">Residência Alpha</p>
                            </div>
                        </div>
                        {/* Project 2 */}
                        <div className="group relative mt-4 overflow-hidden rounded-2xl bg-gray-100">
                            <img className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Modern house exterior with pool at dusk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAP3iZ5c7TAJmjEWk91zyBy9rl3w4pZ8bcTfpobQBkeiUggADBGPkEW48SALLav7T2BmCAhdJQ0SRyAnVSJ4Eufqa_YD6rzcDBova627c8tOhfUavdH7FgvmrRyAzVpd7jdKQkoj2nHHjJW1jiFtx_DABTCPvAliwePf7gAhPfgFWJcZUeMl72WiPtzsvnqnTvznDoGvPZosrWWxB9QV38JLqAypkAfcYEB411GRvoOBEiFwNfbV24Zssezb8g56cipISj0uXhSU7L" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                            <div className="absolute bottom-3 left-3 opacity-0 transition-opacity group-hover:opacity-100">
                                <p className="text-xs font-bold text-white">Casa do Lago</p>
                            </div>
                        </div>
                        {/* Project 3 */}
                        <div className="group relative -mt-4 overflow-hidden rounded-2xl bg-gray-100">
                            <img className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Contemporary kitchen with wooden accents" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnf9Ijd2k7nJ8WnbWOsruIMkZBC8Uq8DfJquBdKs99WLS6BTYLp42UhcHLB32VqAPlMVyb8CCzPErnlWw5Mg7DeXAMxW-eIAeWOZ7GL8Fbp2QCuqTym55Ow5VPMoQZDLy3Qgxf9WYZvh6371KNrp32ZrgpNNGdceKJCtYLOD9TkEHg9OB40XQmT-RKkr2_V5HH7UB7djrVYkpVk-RBegY_Z9fRAabUcra5jdvvtsZY-7-hXqUy3H0278rIUqPw4BjpMv9IaJN6xZZm" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                            <div className="absolute bottom-3 left-3 opacity-0 transition-opacity group-hover:opacity-100">
                                <p className="text-xs font-bold text-white">Apartamento Loft</p>
                            </div>
                        </div>
                        {/* Project 4 */}
                        <div className="group relative overflow-hidden rounded-2xl bg-gray-100">
                            <img className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Clean and bright workspace design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvEwVpsm8WNlFaBJhqpMDZtWUCG90iS7xPzS3GrDQu7TZ4--KSmmCtCbUehh5UZrMwKPEuKhZmmPRQf_eaNr_QiFl3RM2XNQjvnU16gf-imCM_ESu7IIQ-IKtq7tYlwC9tns6AymKmgEVMewyLUix9vhFu-do_SW9Ejbays6xE_oqzn9LCg93_9jDW07pv1UPATuQB9lh6LDiOWRyM64cluGnIh7ealTIGaydXwcC477-1H_rGNq6lNcY-FIkpkLAHPK24QEbF1iQG" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                            <div className="absolute bottom-3 left-3 opacity-0 transition-opacity group-hover:opacity-100">
                                <p className="text-xs font-bold text-white">Escritório Central</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Social Footer */}
                <div className="flex items-center justify-center gap-6 pb-24 opacity-50">
                    <a className="text-foreground transition-colors hover:text-primary" href="#">
                        <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                    </a>
                    <a className="text-foreground transition-colors hover:text-primary" href="#">
                        <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    </a>
                    <a className="text-foreground transition-colors hover:text-primary" href="#">
                        <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm0-1c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11-4.925 11-11 11zm3.176-13.43c.123 1.15-.312 2.051-1.306 2.706 1.054.437 1.83 1.25 1.637 2.652-.162 1.18-.946 2.072-2.35 2.072h-4.157v-9.5h4.157c1.403 0 2.158.891 2.019 2.07zm-2.43 3.65c-.322-.162-.705-.245-1.15-.245h-1.077v3.018h1.077c.445 0 .828-.083 1.15-.245.322-.162.518-.432.588-.81.07-.378-.076-.648-.439-.81-.363-.162-.327-.162-.149-.908zm-.124-3.044c-.234-.117-.54-.176-.918-.176h-.88v2.333h.88c.378 0 .684-.059.918-.176.234-.117.387-.315.459-.594.072-.279.027-.477-.135-.594-.162-.117-.324-.117-.324-.793z"></path></svg>
                    </a>
                </div>
                {/* Floating Navigation */}
                <div className="fixed bottom-6 left-1/2 flex w-max -translate-x-1/2 items-center gap-2 rounded-full bg-card/90 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 dark:bg-slate-800/90">
                    <button className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
                        <span className="material-symbols-outlined">person</span>
                    </button>
                    <button className="flex size-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background">
                        <span className="material-symbols-outlined">grid_view</span>
                    </button>
                    <button className="flex size-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background">
                        <span className="material-symbols-outlined">collections_bookmark</span>
                    </button>
                    <button className="flex size-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background">
                        <span className="material-symbols-outlined">contact_page</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
