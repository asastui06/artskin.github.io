document.addEventListener('DOMContentLoaded', function () {
  // Берём все блоки мастеров
  const masterBlocks = document.querySelectorAll('.master-feature');

  masterBlocks.forEach(function (block) {
    const mainImg = block.querySelector('.master-feature__photo > img');
    const thumbButtons = block.querySelectorAll('.master-feature__thumb');

    if (!mainImg || !thumbButtons.length) return;

    // Синхронизируем стартовую фотку с активной превьюшкой
    const activeThumb =
      block.querySelector('.master-feature__thumb.is-active') || thumbButtons[0];

    const activeImg = activeThumb.querySelector('img');
    if (activeImg) {
      const startSrc = activeImg.getAttribute('data-full') || activeImg.src;
      mainImg.src = startSrc;
      mainImg.alt = activeImg.alt || mainImg.alt;
    }

    // Переключение по клику по превьюшкам
    thumbButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const thumbImg = btn.querySelector('img');
        if (!thumbImg) return;

        const newSrc = thumbImg.getAttribute('data-full') || thumbImg.src;
        const newAlt = thumbImg.alt || mainImg.alt;

        mainImg.src = newSrc;
        mainImg.alt = newAlt;

        thumbButtons.forEach(function (b) {
          b.classList.remove('is-active');
        });
        btn.classList.add('is-active');
      });
    });
  });
});



document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('requestModal');
  const form = document.getElementById('requestForm');
  const successEl = document.getElementById('requestSuccess');

  if (!modal || !form) return;

  const openButtons = document.querySelectorAll('.js-open-request');
  const closeButton = modal.querySelector('.modal-request__close');
  const backdrop = modal.querySelector('.modal-request__backdrop');

  function openModal() {
    modal.classList.add('is-open');
    document.body.classList.add('body--no-scroll');
    successEl.hidden = true;
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('body--no-scroll');
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  closeButton.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // ---- Валидация формы ----
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    function setError(fieldName, message) {
      const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
      if (errorEl) errorEl.textContent = message || '';
      if (message) isValid = false;
    }

    // Очищаем старые ошибки
    ['name', 'phone', 'style', 'comment'].forEach(n => setError(n, ''));

    const name = form.elements['name'].value.trim();
    const phone = form.elements['phone'].value.trim();
    const style = form.elements['style'].value.trim();
    const comment = form.elements['comment'].value.trim();

    // Имя: 2–40 символов
    if (name.length < 2) {
      setError('name', 'Имя должно быть не короче 2 символов.');
    } else if (name.length > 40) {
      setError('name', 'Имя не должно быть длиннее 40 символов.');
    }

    // Телефон: 10–18 символов (цифры и знаки)
    if (phone.length < 10) {
      setError('phone', 'Введите телефон полностью.');
    } else if (phone.length > 18) {
      setError('phone', 'Телефон слишком длинный.');
    }

    // Стиль: 3–50 символов
    if (style.length < 3) {
      setError('style', 'Укажите хотя бы примерный стиль.');
    } else if (style.length > 50) {
      setError('style', 'Слишком длинное описание стиля.');
    }

    // Комментарий: 10–500 символов
    if (comment.length < 10) {
      setError('comment', 'Пожалуйста, добавьте чуть больше деталей (минимум 10 символов).');
    } else if (comment.length > 500) {
      setError('comment', 'Комментарий слишком длинный (максимум 500 символов).');
    }

    if (!isValid) return;

    // Имитация отправки
    form.reset();
    successEl.hidden = false;
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const body = document.body;

  // создаём оверлей для фона
  const overlay = document.createElement('div');
  overlay.classList.add('menu-overlay');
  document.body.appendChild(overlay);

  const closeMenu = () => {
    burger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
  };

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  // закрываем при клике на пункт
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // закрываем при клике в пустое место (оверлей)
  overlay.addEventListener('click', closeMenu);
});

