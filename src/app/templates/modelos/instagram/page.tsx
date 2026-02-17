export default function InstagramPage() {
    return (
        <>
            <div className="relative mx-auto max-w-md min-h-screen shadow-2xl overflow-hidden flex flex-col mesh-bg bg-fixed">
                <header className="pt-12 px-6 pb-6 flex flex-col items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-background-dark rounded-full p-1">
                            <div className="size-28 rounded-full bg-cover bg-center border-2 border-white/20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVMUoY1MRES08aDC1X5XBhNUxjejewFivg8sPcJS6y7bSL3Npa2phH2njuvCFqybAnzheYiIxc7C1whHmuZkkgFpM7VlrZEvgXwq9dFEsFBE543hLcxcUNNfYgWEYi6adtAoPBpKdTHZ690C1vqAy72UdZ_riA7YjTdhHpNjkaSM9BRS3ZdbnwtG5ROLtfDqj4L0LbTymWRynYQ9cQvhIpeLcL52UEnrU3vQQnUBslgHSxPJ9iSqkf6lumN_fgFwHIFFZ-RgFohHp7')" }}>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                            <h1 className="text-xl font-bold tracking-tight text-white">@lucas_influencer</h1>
                            <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        </div>
                        <p className="text-white/80 text-sm mt-1 max-w-[280px]">Criando conteúdo sobre lifestyle e tecnologia. 🚀 | São Paulo, BR</p>
                    </div>
                    <div className="flex gap-8 mt-6 py-3 px-6 glass-card rounded-xl">
                        <div className="text-center">
                            <p className="text-lg font-bold text-white leading-none">150k</p>
                            <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Seguidores</p>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-white leading-none">500</p>
                            <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Posts</p>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-white leading-none">1.2k</p>
                            <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Seguindo</p>
                        </div>
                    </div>
                </header>
                <div className="px-6 flex flex-col gap-3">
                    <button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-xl">work</span>
                        Trabalhe Comigo
                    </button>
                    <div className="flex gap-3">
                        <button className="flex-1 h-12 glass-card hover:bg-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-xl">school</span>
                            Meu Curso
                        </button>
                        <button className="flex-1 h-12 glass-card hover:bg-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-xl">play_circle</span>
                            YouTube
                        </button>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex overflow-x-auto px-6 gap-5 no-scrollbar pb-2">
                        <div className="flex flex-col items-center gap-2 shrink-0 group">
                            <div className="size-16 rounded-full p-0.5 border-2 border-primary/50 group-hover:border-primary transition-colors">
                                <div className="size-full rounded-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqBee86OU3FiN9RS2u3Zk89VA1aCdjLLj5mVevacPxW41fnuHwOIMhVfJSRbvH3MYBI98V8JyF9w3wyhpGEmNhF4aS2lAiV4TA1kCw6DWcrOic9oDofOKi1BLHfzi3pYfwkaPF8iczNkXIZVr6IoGOyPcc3XSeT5epJ6rFXyMCVd1b5Rm3x0zxFdUQNuVG7lQNznenhw_tE11Sbg5Q7a1ArF7tqWAERPac8vBpVkHJL3cyqEGw2uxcoTPBwsBInR20EBAadn6DxxEl')" }}></div>
                            </div>
                            <span className="text-[11px] font-medium text-white/80">Mimos</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 shrink-0 group">
                            <div className="size-16 rounded-full p-0.5 border-2 border-primary/50 group-hover:border-primary transition-colors">
                                <div className="size-full rounded-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2DMJ1zGqq-IS0OZUq1PqTHOp2tFBzsWryhKghpdn3sMxtjJMjoaKhdtUZ9KcyNsQ3AZyGFiUN1OY-wiYpeG-nOWjptMVNn2jc7IB0bD2A_dti3p76OHU5W9bMfY-t_GxYWIp_p-7PcM8k9vkhAXk-WoqueH18dYuUU-VRd9QIdYz-wOcBHVsSjuP6GjkKupH3DzzKw0GzGw-oCT0k9zi0Q7GN1fW4JPufiWsfqJiHFkLcVRoXCDjPMmjmJbEP0yI2AsaHl1h5g0rv')" }}></div>
                            </div>
                            <span className="text-[11px] font-medium text-white/80">Presets</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 shrink-0 group">
                            <div className="size-16 rounded-full p-0.5 border-2 border-primary/50 group-hover:border-primary transition-colors">
                                <div className="size-full rounded-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBO0tyGTFi0gvxsbe3ghpmNWgzr5b2ztIP2eLzihVtfPepwU0hDCGe-cPt3-Q-vvhKV3E02x_dVCGv3Ok196M8ykm3w3SgUMSUnhdDyWBX2Cmctv00iRhAtM3etkHzat67l2fYVZnS7b0tMLYXUVzd07XJKD0I0XMsMbhRJ_sXNz1pDoJAWPO23gEgU_4raBxrGI3yhzXXjxSV2N3T8pEtonQK63ounK2TUSWCixrurOBTvofMql2XzkVoUCtzcuXmzNKs6N7I1TfeY')" }}></div>
                            </div>
                            <span className="text-[11px] font-medium text-white/80">Treino</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 shrink-0 group">
                            <div className="size-16 rounded-full p-0.5 border-2 border-primary/50 group-hover:border-primary transition-colors">
                                <div className="size-full rounded-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7Bg4ohTpNZcfF5FCSOlTJfHBmObm_GtCM2mZgX02QZPCzDc10tb_-v2HtfXf9FTgqa9Npzp60aaSYeyrGODmnAPj3kz3mKMu_Q8qqrG3UVTWusIRb5epVxMc_hIGd-Y1LHQgT6yfTl31-hHt6_Nl895Svo84Ck_7d0FfOwGq2dEuTnKP6IfOv4pW7iDEq-TwcfDfJE_EE__2cYqa8DxP25HRpFZz1pVHmklWTmvqRuQ3uasMe7dh6JzrSwLD2Z9culjUrb6uHDyVH')" }}></div>
                            </div>
                            <span className="text-[11px] font-medium text-white/80">Viagens</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 shrink-0 group">
                            <div className="size-16 rounded-full p-0.5 border-2 border-primary/50 group-hover:border-primary transition-colors">
                                <div className="size-full rounded-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKpdU0P4noSsw4cJ9EGxpuSfL8L2IcDaYhB8GPPIB-nlCVfst8K1ryc1oVOw47Xq-0RBw8N3jWDUxQmET6r4QrPBFYemJ6Usb1LvXrHiFNIuWh6DPsYGgB6SFp0u5J2cru40XwJoy9NKtKls-P8IMHGAhTNy-mUVLsLfz0TWFKqcdhkDDVJQy8s0XhDb4yQLBWDOUsnoU3KX_Ohgy0NkLzkWTgZ7UWYSmSxIjRhZCf9TjTECAW5s_HGmkfxWgOm3jPAFowgVNem2qN')" }}></div>
                            </div>
                            <span className="text-[11px] font-medium text-white/80">Tech</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex-1 glass-card rounded-t-[2.5rem] pt-8 px-1 pb-20">
                    <div className="flex items-center justify-center gap-6 mb-6">
                        <button className="flex items-center gap-1 text-white border-b-2 border-primary pb-1 font-bold">
                            <span className="material-symbols-outlined text-lg">grid_on</span>
                            FEED
                        </button>
                        <button className="flex items-center gap-1 text-white/50 pb-1 font-medium hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-lg">movie</span>
                            REELS
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                        <div className="aspect-square bg-cover bg-center bg-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9i1Ihcc4pEXCbmsxlOX5zCpQn1grXI-O-NoHtLeXp70R2JcUc1t4rM6Fq-5wEoxG9XFPUA4634vuSKgUsepAxVvW75ZEWRd2X0vI4MIHndbkQclA4ZAuKVzzYWHhcJLuhybhgKhgBShoiJX0ODjJ7HHio8vcX64cfhXTlK30SBxu4Cxskn6gJ6O2I1KD7LsNs0go2lhx-WaY6wVllglAwA3V862_df8B6hRCgPvkJp1Y8S12FIhaQa9MkhJ6sdxRi0meDERe2tDQE')" }}></div>
                        <div className="aspect-square bg-cover bg-center bg-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6fR-UNqG63gipeDBMAUEvLNWblsWG8zUoxxjyRlYp8RwmAAup4fXzBFEYF_V9NiPriItVkQ_dri0DSoHCtJyab2toZHYmNeC3HXnbNjcdc-bOCfIpzFP4G8F9sEMEwXBS3uikm-hFyucXTNNhE0Vkpa_0dcI04y-_gDMvC03EOdEUZu-YrQc8xZd7-KvSIwUMstQcdUnktj9ZFm1UbADr_XmyhTREHZwz18VI3_pzPDFyuVHlptAUrKxV8lfde8e7BM4Oaq7Kq_1Y')" }}></div>
                        <div className="aspect-square bg-cover bg-center bg-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDprphHo81DH7hfVpqnqqyW5AJYu2cOn8CBpfZsrW7-jJ43WFWHC0XrWEcfpuzySROXjA0Rc_v6aKbA1zGZPa-ncvthJfj7ov-43cM-2fnG5zK38skgX-0z_0-TILX4jpjJ_okBSAZc_TeQvhZY_G_Nd3879f7uKC1LwQOo8efgGllRMJ8n0V7qm4wQvcPDANcKIqDEFqEq4Kuony2OoXyfMkFcsEsb7v_YtyI0qLUa7SJxuxtIBE7TOnWrNDIyaYLrG4yCIkOwUnZq')" }}></div>
                        <div className="aspect-square bg-cover bg-center bg-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWHXze4jISm3OpHC-tJhJH3tYqJtYvZVSDyKwHQq_Qy3ScktMtq9zpzzitADLxl13tZ__G_8fiKgpAp2qVWknG2XnRl_CqGDV4Tgtw8JoRS6WmW8TB8iTbT-eICCqZysKX0ZVWuXaToqArNak1PSFpoelD01aDuVO7R7UfuWWXc3aj_LjGWZ2JcuUaHRD_m7paKe_CRp5eBPEyGRWB_fRM1W1xvGBgNyWj6abc4vE2rLtSuKkxqGDzQjV74vWhW8CuktOouB9EzDF_')" }}></div>
                        <div className="aspect-square bg-cover bg-center bg-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBri5jamXQXHVam3zZbQ22OTzvXd8Q7KNUESvpFuBWLC9MdSlbcV-dvdDzxhpoEdO1j-1VFIyAMTz8a8y9l5scI2MpxQVO1_fYKazdU-Hih1IoCYBM2duKt5W5xdQEUs1IMG2wcp1rnfIMu_pr9BjXHf5JRkvh6XgDpEJZ8Tz36WaMW5ODdT9aATWNXBx-4O_KuIl3p_v2zpFRnMG8pCwS2hACH3qWzdUOseFQYOz-OmX7-uurSeZleM7aIGsRbFjahDuMRjeWZ3LxL')" }}></div>
                        <div className="aspect-square bg-cover bg-center bg-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnnVa-OEQgk3bp-gP091AD-TYEgyq8jbM1pPFUQJBuYsOmrnNwrOM0lytIHmMui5umaKJ8Gg59pmcPReN7xmsbgP2oobAQBQXa-d86n2SPJX2c0TJy9SaLbjoQoEv3R3CuEU_n_wFjWmyWa3n-SJbq3AXKXuUQimOdyAxmVolvFngi4KIm2s7VIASdER_YvspuhVH2sHaPLSyQ3AREfxo5ulLv0GTg8FSMarl0vU17T9GfqUjmnvsHSgtql28d2PHg8Nun2BMvWffQ')" }}></div>
                        <div className="aspect-square bg-cover bg-center bg-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1DfEQG2MKYyzUji3gQrIZakwz6yQRpQlqUFqIqDCHG2tT6prc7cn5shRlJUSnfGzxgFil3JNyiXG6cRudMnmDTd0TscaL66bhWUUZNb33BmCJ2ayg3DXFB5_mxIkKf0hsU79veFmgVdgnLYg75Se2NtCbZ7o106PMO3yZ1So3utRGMRFiocGfvoidC5FlbpUdGdGrhbePkXO-OJoEHPxvoQjKQZsEmQT1QTnoCoFmHYQlDCKXVY6AQL45TX6urBGa94B1F-Ps6dh2')" }}></div>
                        <div className="aspect-square bg-cover bg-center bg-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBhcJ6o1wVn_4sNxGMUsS-CiyW39ltVnkm1QPQ-y_b7Pg7FEGol_MzhSOz-kxeV147ilNECZswwfFwxq1sIZIZsadokKSzxl30OOe837cTRJEjDG4sRuXoWdQq2684dliEWbLKfuOqZ7n3fRoAIgtlqkfz7zW3nmHcDpDs2Pv-crE1cMezPK5bbmwGqjNL-K4Pm1pO2E3mWnls7B2rNXQVcVRN8Q5oyN_qdf3FcRe0IQA0ACz7VHJAJN_JtAcu0nwXXD5pba1itadf8')" }}></div>
                        <div className="aspect-square bg-cover bg-center bg-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKUSTRiI72qPfemHYJzrEe9OUgJpnNThY3LeJ6avSDP4iKyt2O2Dfr1OBLulpS9EQfowkr0rSt8saFR-SnO1QrUKMp-h7SQwPakcT4HvDxAXwGimbCGjtW5w_HxqkQ43qG3xOLLmXCn77RjyfJ5mj-eKVioOwF8fs4j7RDb88nVcw8G0WyXZjVoSUVYJ3LbzfOev8QXIvgfgOcXqyuAZHUOLLvV9gu6p1g-El_pGTv8zcqbdNZrfxJYuQraXhiTIOc3FAye9JmIDoN')" }}></div>
                    </div>
                </div>
                <nav className="fixed bottom-0 w-full max-w-md bg-background-dark/80 backdrop-blur-xl border-t border-white/10 flex justify-around items-center h-16 px-4">
                    <a className="text-white" href="#">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                    </a>
                    <a className="text-white/50 hover:text-white transition-colors" href="#">
                        <span className="material-symbols-outlined text-2xl">search</span>
                    </a>
                    <a className="text-white bg-primary rounded-lg p-1.5 shadow-lg shadow-primary/40" href="#">
                        <span className="material-symbols-outlined text-2xl">add_box</span>
                    </a>
                    <a className="text-white/50 hover:text-white transition-colors" href="#">
                        <span className="material-symbols-outlined text-2xl">favorite</span>
                    </a>
                    <a className="size-7 rounded-full overflow-hidden border border-white/30" href="#">
                        <img className="w-full h-full object-cover" alt="Tiny profile thumbnail avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaM6cweZnLzruYc-cb7c2aZuMMw3DP064Q3tZJY8YsJGo_PuupM6HLT1b0p0pOwc9_qbhj84XZH-VOTvh1u4zqaCajKDLLyouI6e-Y_F803JrWsiIKQYHU85OH5NKuPKe5hUjvov82h1l1JYBC9agoGOJCNeuCjHb80rcVR6ehDEyWFM-eTW9SjBhvOiDpdcMvxA0GGBI4P_bn-HsqekGM7Rcw--aOJ1Uby8J1UzDs4fNRFWBrZVQYf6u9V3KIy9F11twDkVd2-KvQ" />
                    </a>
                </nav>
            </div>
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .mesh-bg {
                    background-color: #f6f6f8;
                    background-image: 
                        radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
                        radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
                        radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
                    background-attachment: fixed;
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </>
    )
}
