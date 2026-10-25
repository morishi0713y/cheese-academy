 
  const menuBtn = document.querySelector('.menu_btn');
  const nav = document.querySelector('nav');

  // ボタンを押したら開閉
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });

  // メニューのリンクを押したら閉じる
  document.querySelectorAll('.nav_list a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
    });
  });

  
  // 画面に入ったら is-show を付ける
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-show');
        observer.unobserve(entry.target);   // 一度表示したら監視をやめる
      }
    });
  }, { threshold: 0.2 });                   // 20% 見えたら発動

  document.querySelectorAll('.fadein').forEach((el) => {
    observer.observe(el);
  });

// ========== ギャラリーの矢印ボタン（無限ループ） ==========
const gallery = document.querySelector('.gallery');
const prevBtn = document.querySelector('.gallery_btn.prev');
const nextBtn = document.querySelector('.gallery_btn.next');

// 元の4枚を複製して後ろにつなげる（複製は読み上げ対象から外す）
const originals = [...gallery.querySelectorAll('img')];
originals.forEach((img) => {
  const copy = img.cloneNode();
  copy.alt = '';
  gallery.appendChild(copy);
});

// 画像1枚分＋すき間の幅
const getStep = () => {
  const img = gallery.querySelector('img');
  const gap = parseInt(getComputedStyle(gallery).gap) || 0;
  return img.offsetWidth + gap;
};

// 1セット（元の4枚）分の幅
const getSetWidth = () => getStep() * originals.length;

// 右へ：2セット目に入っていたら、同じ見た目の1セット目へ一瞬で戻してから進む
nextBtn.addEventListener('click', () => {
  if (gallery.scrollLeft >= getSetWidth() - 5) {
    gallery.scrollTo({ left: gallery.scrollLeft - getSetWidth(), behavior: 'instant' });
  }
  gallery.scrollBy({ left: getStep(), behavior: 'smooth' });
});

// 左へ：先頭にいたら、同じ見た目の2セット目へ一瞬で移ってから戻る
prevBtn.addEventListener('click', () => {
  if (gallery.scrollLeft <= 5) {
    gallery.scrollTo({ left: gallery.scrollLeft + getSetWidth(), behavior: 'instant' });
  }
  gallery.scrollBy({ left: -getStep(), behavior: 'smooth' });
});