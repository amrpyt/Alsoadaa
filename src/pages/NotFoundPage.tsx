import { useEffect, useState } from 'react';
import { useRouter } from '../lib/router';
import { useLanguage } from '../lib/LanguageContext';
import { Button } from '../components/ui/button';
import { Home, ArrowLeft, Search, Frown } from 'lucide-react';

export function NotFoundPage() {
    const { navigate } = useRouter();
    const { language } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Parallax effect for the background elements
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) / 50,
                y: (e.clientY - window.innerHeight / 2) / 50,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const isArabic = language === 'ar';

    const content = {
        en: {
            title: "404",
            subtitle: "Oops! Page Not Found",
            description: "The page you're looking for seems to have wandered off to the citrus groves. Let's get you back on track!",
            homeButton: "Back to Home",
            searchHint: "Or try searching for what you need",
            funFact: "Fun fact: Even the freshest oranges sometimes get lost! 🍊"
        },
        ar: {
            title: "404",
            subtitle: "عفواً! الصفحة غير موجودة",
            description: "يبدو أن الصفحة التي تبحث عنها قد ضلت طريقها إلى بساتين الحمضيات. دعنا نعيدك إلى المسار الصحيح!",
            homeButton: "العودة للرئيسية",
            searchHint: "أو حاول البحث عما تحتاجه",
            funFact: "حقيقة ممتعة: حتى أفضل البرتقال يضيع أحياناً! 🍊"
        },
        ru: {
            title: "404",
            subtitle: "Ой! Страница не найдена",
            description: "Страница, которую вы ищете, похоже, заблудилась в цитрусовых рощах. Давайте вернём вас на правильный путь!",
            homeButton: "На главную",
            searchHint: "Или попробуйте поискать то, что вам нужно",
            funFact: "Интересный факт: Даже самые свежие апельсины иногда теряются! 🍊"
        }
    };

    const t = content[language];

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-100 selection:text-orange-900 overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Large gradient orbs */}
                <div
                    className="absolute w-[600px] h-[600px] rounded-full bg-[var(--citrus-orange)] opacity-10 blur-[120px] animate-pulse"
                    style={{
                        top: '10%',
                        right: '20%',
                        transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
                        animationDuration: '4s'
                    }}
                />
                <div
                    className="absolute w-[500px] h-[500px] rounded-full bg-[var(--fresh-green)] opacity-10 blur-[100px] animate-pulse"
                    style={{
                        bottom: '10%',
                        left: '10%',
                        transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
                        animationDuration: '6s'
                    }}
                />
                <div
                    className="absolute w-[400px] h-[400px] rounded-full bg-[var(--trust-blue)] opacity-10 blur-[80px] animate-pulse"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                        animationDuration: '5s'
                    }}
                />

                {/* Floating fruit illustrations */}
                <div
                    className="absolute text-8xl opacity-20 animate-bounce"
                    style={{
                        top: '20%',
                        left: '10%',
                        animationDuration: '3s',
                        transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`
                    }}
                >
                    🍊
                </div>
                <div
                    className="absolute text-7xl opacity-15 animate-bounce"
                    style={{
                        top: '60%',
                        right: '15%',
                        animationDuration: '4s',
                        animationDelay: '0.5s',
                        transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
                    }}
                >
                    🍋
                </div>
                <div
                    className="absolute text-6xl opacity-10 animate-bounce"
                    style={{
                        bottom: '30%',
                        left: '25%',
                        animationDuration: '3.5s',
                        animationDelay: '1s',
                        transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`
                    }}
                >
                    🥔
                </div>
                <div
                    className="absolute text-5xl opacity-15 animate-bounce"
                    style={{
                        top: '35%',
                        right: '30%',
                        animationDuration: '2.5s',
                        animationDelay: '0.8s',
                        transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`
                    }}
                >
                    🧅
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
                <div
                    className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    {/* 404 Number with Gradient */}
                    <div className="relative mb-8">
                        <h1
                            className="text-[12rem] md:text-[16rem] font-bold leading-none bg-gradient-to-br from-[var(--citrus-orange)] via-[var(--berry-red)] to-[var(--citrus-orange-light)] bg-clip-text text-transparent select-none"
                            style={{
                                textShadow: '0 20px 60px rgba(255, 140, 66, 0.3)',
                                animation: 'pulse 2s ease-in-out infinite'
                            }}
                        >
                            {t.title}
                        </h1>
                        {/* Sad face emoji behind the number */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                            <Frown className="w-48 h-48 text-slate-400" strokeWidth={1} />
                        </div>
                    </div>

                    {/* Subtitle */}
                    <h2
                        className={`text-3xl md:text-4xl font-bold text-slate-800 mb-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                    >
                        {t.subtitle}
                    </h2>

                    {/* Description */}
                    <p
                        className={`text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                    >
                        {t.description}
                    </p>

                    {/* Fun Fact Badge */}
                    <div
                        className={`inline-block mb-10 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--citrus-orange-bg)] text-[var(--citrus-orange)] rounded-full text-sm font-medium border border-[var(--citrus-orange)]/20">
                            <Search className="w-4 h-4" />
                            {t.funFact}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div
                        className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                    >
                        <Button
                            onClick={() => navigate('home')}
                            className="group relative overflow-hidden bg-gradient-to-r from-[var(--citrus-orange)] to-[var(--citrus-orange-hover)] hover:from-[var(--citrus-orange-hover)] hover:to-[var(--citrus-orange-active)] text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isArabic ? (
                                    <>
                                        {t.homeButton}
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" style={{ transform: 'scaleX(-1)' }} />
                                    </>
                                ) : (
                                    <>
                                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        {t.homeButton}
                                    </>
                                )}
                            </span>
                            {/* Shine effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </Button>
                    </div>

                    {/* Bottom decorative line */}
                    <div
                        className={`mt-16 flex items-center justify-center gap-2 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div className="w-12 h-1 rounded-full bg-gradient-to-r from-transparent to-[var(--citrus-orange)]" />
                        <div className="w-3 h-3 rounded-full bg-[var(--citrus-orange)] animate-pulse" />
                        <div className="w-12 h-1 rounded-full bg-gradient-to-l from-transparent to-[var(--citrus-orange)]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
