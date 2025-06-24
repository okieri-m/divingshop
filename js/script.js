"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        
        // Change icon based on sidebar state
        const icon = menuToggle.querySelector('i');
        if (sidebar.classList.contains('open')) {
            icon.className = 'ri-close-line ri-lg';
        } else {
            icon.className = 'ri-menu-line ri-lg';
        }
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isMobile = window.innerWidth < 768;
        if (isMobile && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('open');
            menuToggle.querySelector('i').className = 'ri-menu-line ri-lg';
        }
    });

    // 言語切り替え機能
    const languageSwitches = document.querySelectorAll('.language-switch__checkbox');
    const currentLang = document.documentElement.lang;
    
    // 初期状態の設定
    languageSwitches.forEach(function(switchEl) {
        switchEl.checked = currentLang === 'en';
    });
            
    languageSwitches.forEach(function(switchEl) {
        switchEl.addEventListener('change', function() {
            // すべてのスイッチを同期
            languageSwitches.forEach(function(el) {
                el.checked = switchEl.checked;
            });
            
            // 言語切り替えの実装
            const isEnglish = switchEl.checked;
            const newLang = isEnglish ? 'en' : 'ja';
            const currentPath = window.location.pathname;
            
            // トランジション効果を適用
            document.body.classList.add('page-transition');
            
            // トランジション完了後にページ遷移
            setTimeout(() => {
                // 現在のページの言語バージョンを切り替え
                if (isEnglish) {
                    // 英語ページに切り替え
                    if (!currentPath.includes('.en.html')) {
                        const newPath = currentPath.replace('.html', '.en.html');
                        window.location.href = newPath;
                    }
                } else {
                    // 日本語ページに切り替え
                    if (currentPath.includes('.en.html')) {
                        const newPath = currentPath.replace('.en.html', '.html');
                        window.location.href = newPath;
                    }
                }
            }, 300); // トランジション時間と同じ時間を設定
        });
    });

    // スクロールアニメーション
    const scrollTargets = document.querySelectorAll(".js-scroll--animation");

    const options = {
        root: null,
        threshold: 0.2,
    };

    const observer = new IntersectionObserver(scrollInAnimation, options);

    function scrollInAnimation(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade--in");
            } else {
                entry.target.classList.remove("fade--in");
            }
        });
    }

    scrollTargets.forEach((scrollTarget) => {
        observer.observe(scrollTarget);
    })
});
