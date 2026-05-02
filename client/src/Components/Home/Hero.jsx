import { User } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
    const {user} = useSelector(state => state.auth)
    const [menuOpen, setMenuOpen] = React.useState(false);

    const companiesLogo = [
        { logo: (<svg className="h-7 w-auto max-w-xs" width="128" height="42" viewBox="0 0 128 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H27.7325V14H13.8663L0 0ZM0 14H13.8663L27.7325 28H0V14ZM0 28H13.8663V42L0 28Z" fill="#90A1B9" /><path d="M43.3801 11.0446H54.5901V14.6412H47.6231V19.6392H54.5901V23.1564H47.6231V29.5559H43.3801V11.0446ZM56.8949 16.8094H60.9025V19.4804C61.1118 18.5625 61.5401 17.8579 62.1859 17.3647C62.8482 16.8529 63.5835 16.598 64.386 16.598C64.8054 16.598 65.1549 16.6339 65.4334 16.7037V20.4591C65.0337 20.4104 64.6315 20.3842 64.2287 20.3797C63.1286 20.3797 62.3001 20.7403 61.7405 21.4634C61.1829 22.1687 60.9025 23.2262 60.9025 24.6373V29.5559H56.8968V16.8094H56.8949ZM71.7597 29.8998C70.5379 29.8998 69.4721 29.6084 68.5642 29.0268C67.6735 28.4452 66.9655 27.6196 66.5214 26.6466C66.0501 25.625 65.8128 24.4688 65.8128 23.1826C65.8128 21.9131 66.059 20.7666 66.5474 19.7449C67.0055 18.7579 67.7325 17.9233 68.6429 17.3385C69.5672 16.7569 70.6241 16.4654 71.8124 16.4654C72.7025 16.4654 73.498 16.6601 74.1959 17.0477C74.8937 17.4365 75.4177 17.9655 75.7673 18.6342V16.8094H79.7482V29.5559H75.7673V27.7573C75.4177 28.392 74.8766 28.9115 74.1432 29.3176C73.4098 29.7102 72.5902 29.9101 71.7597 29.8998ZM72.9125 26.5409C73.8723 26.5409 74.6146 26.2238 75.1386 25.5891C75.6626 24.9543 75.9246 24.1517 75.9246 23.1826C75.9246 22.2308 75.6626 21.4372 75.1386 20.8024C74.6146 20.1677 73.8723 19.8506 72.9125 19.8506C72.0033 19.8506 71.2712 20.1587 70.7123 20.7762C70.1712 21.3936 69.9003 22.1949 69.9003 23.1826C69.9003 24.1703 70.1712 24.9806 70.7123 25.6153C71.2712 26.2328 72.0046 26.5409 72.9125 26.5409ZM82.551 16.8094H86.5586V18.6605C86.839 18.0072 87.2919 17.4781 87.92 17.0739C88.5671 16.6697 89.3176 16.4654 90.1728 16.4654C92.1636 16.4654 93.4825 17.2494 94.1277 18.8194C94.483 18.1077 95.0387 17.5191 95.7258 17.1271C96.4604 16.6806 97.3042 16.452 98.1613 16.4654C101.147 16.4654 102.64 18.1923 102.64 21.6486V29.5559H98.6066V22.389C98.6066 21.5262 98.4493 20.8915 98.1352 20.4854C97.8206 20.0805 97.3492 19.8769 96.7205 19.8769C96.0398 19.8769 95.5158 20.1151 95.1491 20.591C94.7824 21.0497 94.5991 21.851 94.5991 22.9975V29.5559H90.5655V22.3627C90.5655 21.4993 90.4088 20.8729 90.0941 20.4854C89.7985 20.0805 89.3347 19.8769 88.7073 19.8769C88.0082 19.8769 87.4753 20.1151 87.1086 20.591C86.7419 21.0497 86.5586 21.851 86.5586 22.9975V29.5559H82.5523V16.8094H82.551ZM117.695 22.5216C117.695 23.0673 117.659 23.6585 117.588 24.2933H108.265C108.301 25.1221 108.58 25.7556 109.104 26.1976C109.628 26.6376 110.336 26.8586 111.225 26.8586C112.465 26.8586 113.251 26.4788 113.582 25.721H117.511C117.318 26.9733 116.638 27.9859 115.468 28.7623C114.316 29.52 112.901 29.8998 111.225 29.8998C109.06 29.8998 107.358 29.3086 106.117 28.1275C104.896 26.9457 104.284 25.2983 104.284 23.1826C104.284 21.8074 104.563 20.6173 105.122 19.6123C105.662 18.6086 106.494 17.7964 107.505 17.2853C108.536 16.7396 109.732 16.4654 111.096 16.4654C112.387 16.4654 113.53 16.721 114.525 17.2328C115.538 17.7445 116.315 18.4581 116.856 19.3747C117.416 20.2926 117.695 21.3411 117.695 22.5216ZM113.738 21.7812C113.721 20.935 113.485 20.2906 113.031 19.8506C112.578 19.4106 111.922 19.1896 111.066 19.1896C110.211 19.1896 109.53 19.4272 109.024 19.9038C108.535 20.3624 108.282 20.9875 108.264 21.7812H113.738ZM119.462 16.8094H123.469V19.4804C123.678 18.5625 124.107 17.8579 124.752 17.3647C125.379 16.8664 126.155 16.5961 126.953 16.598C127.371 16.598 127.721 16.6339 128 16.7037V20.4591C127.6 20.4104 127.198 20.3842 126.795 20.3797C125.695 20.3797 124.867 20.7403 124.307 21.4634C123.748 22.1687 123.469 23.2262 123.469 24.6373V29.5559H119.462V16.8094Z" fill="#90A1B9" /></svg>) },
        { logo: (<svg className="h-7 w-auto max-w-xs" width="143" height="32" viewBox="0 0 143 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M77.6225 10.3042H80.8137V19.1813C80.8137 23.6873 78.3304 26.2717 74.0042 26.2717C69.723 26.2717 67.2621 23.7322 67.2621 19.3049V10.3154H70.4534V19.2038C70.4534 21.8332 71.7456 23.2378 74.0492 23.2378C76.3527 23.2378 77.6225 21.8669 77.6225 19.3161V10.3042ZM59.6436 16.6418H52.4295V10.3042H49.2383V26.0357H52.4295V19.642H59.6323V26.0357H62.8236V10.3042H59.6323V16.6418H59.6436ZM139.56 10.3042V26.0133H142.706V10.3042H139.56ZM127.031 19.2599H132.84V16.3946H127.031V13.1696H135.458V10.3154H123.884V26.0245H135.762V23.1591H127.031V19.2599ZM114.513 21.114L110.94 10.293H108.333L104.759 21.114L101.287 10.3042H97.8937L103.377 26.0245H106.018L109.591 15.6979L113.165 26.0245H115.828L121.3 10.3042H117.985L114.513 21.114ZM92.2191 10.3941L99.0848 26.0245H95.7362L94.3204 22.7546H87.1176L87.0164 22.9793L85.6905 26.0245H82.4318L89.3649 10.3042H92.1517L92.2191 10.3941ZM92.9832 19.5409L90.7134 14.2708L88.4548 19.5409L88.2974 19.9004H93.1293L92.9832 19.5409Z" fill="#90A1B9" /><path d="M17.8221 24.3614C17.867 24.3277 17.8783 24.2603 17.8558 24.2041C14.7573 17.5444 10.8919 11.2692 6.33804 5.50604C6.33804 5.50604 2.71979 8.9445 2.97824 12.3942C3.03878 13.1895 3.25553 13.9651 3.61608 14.6766C3.97664 15.3881 4.47394 16.0215 5.07952 16.5406C8.23707 19.6195 15.8781 23.5074 17.6535 24.3951C17.7097 24.4176 17.7771 24.4064 17.8221 24.3614ZM16.6422 26.9908C16.6197 26.9234 16.5523 26.8785 16.4737 26.8785L3.75358 27.3167C5.13571 29.7776 7.46173 31.6878 9.87764 31.1035C11.5519 30.6877 15.3275 28.0471 16.5748 27.1481C16.6759 27.0695 16.6422 27.0021 16.6422 26.9908ZM16.8332 25.8559C16.9007 25.7548 16.7883 25.6649 16.7883 25.6649C11.2036 21.8893 0.371296 16.0911 0.371296 16.0911C0.0122558 17.1916 -0.0881835 18.3601 0.0777841 19.5057C0.243752 20.6513 0.671656 21.7432 1.32824 22.6966C1.98482 23.6499 2.8524 24.439 3.86354 25.0026C4.87469 25.5661 6.00216 25.8889 7.15833 25.9458C7.34936 25.9795 14.7207 25.9458 16.6984 25.9346C16.7546 25.9233 16.7995 25.9009 16.8332 25.8559ZM17.676 0.0112368C17.1254 0.0561841 15.6309 0.404525 15.6309 0.404525C12.2598 1.26976 11.462 4.33741 11.462 4.33741C10.844 6.25891 11.4733 8.38266 11.4733 8.38266C12.597 13.3718 18.1255 21.5859 19.3166 23.3052C19.3952 23.395 19.4626 23.3613 19.4626 23.3613C19.5301 23.3389 19.5862 23.2827 19.5862 23.204C21.4291 4.86554 17.676 0.0112368 17.676 0.0112368ZM21.8898 23.3389C21.9572 23.3613 22.0359 23.3389 22.0696 23.2714C23.2944 21.5073 28.7892 13.3381 29.9129 8.37143C29.9129 8.37143 30.5197 5.96675 29.9354 4.32617C29.9354 4.32617 29.1038 1.21358 25.7328 0.393289C25.7328 0.393289 24.7664 0.146079 23.7326 0C23.7326 0 19.9571 4.8543 21.7999 23.1928C21.7887 23.2602 21.8336 23.3164 21.8898 23.3389ZM24.9013 26.8897C24.8713 26.8957 24.8429 26.9078 24.8178 26.9252C24.7927 26.9426 24.7714 26.9649 24.7552 26.9908C24.7439 27.0583 24.7552 27.1144 24.8001 27.1594C26.0137 28.0359 29.7106 30.6203 31.486 31.1147C31.486 31.1147 34.7784 32.2384 37.6326 27.3279L24.9013 26.8897ZM41.0261 16.0686C41.0261 16.0686 30.2163 21.8781 24.6203 25.6537C24.5642 25.6986 24.5304 25.766 24.5529 25.8334C24.5529 25.8334 24.6091 25.9346 24.6878 25.9346C26.6879 25.9346 34.2615 25.9458 34.4638 25.9121C35.2167 25.8559 35.9583 25.6874 36.655 25.4064C36.655 25.4064 39.3518 24.5524 40.7452 21.4848C40.7452 21.4848 41.9925 18.9902 41.0261 16.0686ZM23.5978 24.3614C23.6427 24.3951 23.7102 24.4064 23.7663 24.3727C25.5867 23.4625 33.1716 19.6082 36.3066 16.5406C36.3066 16.5406 38.2955 14.945 38.3967 12.3717C38.6214 8.80966 35.0369 5.50604 35.0369 5.50604C35.0369 5.50604 28.4071 13.5404 23.5416 24.1592C23.5338 24.1949 23.5348 24.232 23.5446 24.2672C23.5544 24.3025 23.5727 24.3348 23.5978 24.3614Z" fill="#90A1B9" /></svg>) },
    ];

    return (
        <>
            <div className="min-h-screen pb-20">
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    <a href="https://prebuiltui.com">
                        <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
                    </a>

                    <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
                        <a href="#" className="hover:text-green-600 transition">Home</a>
                        <a href="#features" className="hover:text-green-600 transition">Features</a>
                        <a href="#testimonials" className="hover:text-green-600 transition">Testimonials</a>
                        <a href="#cta" className="hover:text-green-600 transition">Contact</a>
                    </div>

                    <div className="flex gap-2">
                        <Link to='/login?state=register' className="hidden md:block px-6 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white" hidden={user}>
                            Get started
                        </Link>
                        <Link to='/login' className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900" hidden={User}>
                            Login
                        </Link>
                        <Link to='/app' className="hidden md:block px-8 py-2 bg-green-500
                     hover:bg-green-700 active:scale-95 transition-all rounded-full text-white" hidden={!user}>
                        Dashboard
                        </Link>
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu">
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                <div className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <a href="#" className="text-white">Home</a>
                    <a href="#features" className="text-white">Features</a>
                    <a href="#testimonials" className="text-white">Testimonials</a>
                    <a href="#contact" className="text-white">Contact</a>
                    <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-green-600 hover:bg-green-700 transition text-white rounded-md flex">
                        X
                    </button>
                </div>

                <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
                    <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-green-300 blur-[100px] opacity-30"></div>

                    <div className="flex items-center mt-24">
                        <div className="flex -space-x-3 pr-3">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1]" />
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]" />
                        </div>

                        <div>
                            <div className="flex">
                                {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-green-600"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                                ))}
                            </div>
                            <p className="text-sm text-gray-700">
                                Used by 10,000+ users
                            </p>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
                        Land your dream job with <span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent text-nowrap">AI-Powered</span> resume.
                    </h1>

                    <p className="max-w-md text-center text-base my-7">Create, edit and download professional resume with AI-powered assistance.</p>

                    <div className="flex items-center gap-4">
                        <Link to='/app' className="bg-green-500 hover:bg-green-600 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-green-400 flex items-center transition-colors">
                            Get started
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </Link>
                        <button className="flex items-center gap-2 border border-slate-400 hover:bg-green-50 transition rounded-full px-7 h-12 text-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video size-5"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
                            <span>Try demo</span>
                        </button>
                    </div>

                    <p className="py-6 text-slate-600 mt-14">Trusted by leading brands</p>

                    <div className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4" id="logo-container">
                        {companiesLogo.map((company, index) => (
                            <React.Fragment key={index}>
                                {company.logo}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
            </style>
        </>
    );
};

export default Hero;

