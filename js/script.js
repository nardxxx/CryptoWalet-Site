
function webpAndAvifCheck() {
  function F(a) { document.body.classList.add(a) } var A = new Image;
  A.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=", A.onload = function () { F("avif") },
    A.onerror = function () {
      var a = new Image; a.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==", a.onload = function () { F("webp") }
    };
}
webpAndAvifCheck();

// const accordions = document.querySelectorAll(".spoiler-answer");

// const openAccordion = (accordion) => {
// 	const content = accordion.querySelector(".spoiler-answer__text");
// 	accordion.classList.add("spoiler-answer_active");
// 	content.style.maxHeight = content.scrollHeight + "px";
// };

// const closeAccordion = (accordion) => {
// 	const content = accordion.querySelector(".spoiler-answer__text");
// 	accordion.classList.remove("spoiler-answer_active");
// 	content.style.maxHeight = null;
// };

// accordions.forEach((accordion) => {
// 	const intro = accordion.querySelector(".spoiler-answer__close");
// 	const content = accordion.querySelector(".spoiler-answer__text");
// 	intro.onclick = () => {
// 		if (content.style.maxHeight) {
// 			closeAccordion(accordion);
// 		} else {
// 			accordions.forEach((accordion) => closeAccordion(accordion));
// 			openAccordion(accordion);
// 		}
// 	};
// });


if ($('.accordeon').length > 0) {
	$('.accordeon-body').css({ 'display': 'none' });
	$('.accordeon-body__close, .accordeon > .title').on('click', function () {
		$(this).closest('li').toggleClass('active').find('.title').eq(0).toggleClass('active').next('.accordeon-body').toggleClass('active').slideToggle(200);
	});
}

function select(selector) {
  return document.querySelector(selector);
}
function selectAll(selector) {
  return document.querySelectorAll(selector);
}
function create(el) {
  return document.createElement(el);
}

const swiper = new Swiper('.section-sliderinfo-slider', {
  // loop: true,
  slidesPerView: 'auto',
  autoHeight: true,
  // Navigation arrows
  navigation: {
    nextEl: '.section-sliderinfo-button-row__next',
    prevEl: '.section-sliderinfo-button-row__prev',
  },
  on: {
    slideChange: function (e) {
      var currentSlide = e.realIndex + 1;
      select('.section-sliderinfo-button-row__counter').innerHTML = currentSlide;
      let numOfSlides = e.wrapperEl.querySelectorAll(".swiper-slide").length;
      select('.section-sliderinfo-button-row__counter').innerHTML += ' of ' + numOfSlides;
    },
    beforeInit: function (e) {
      let numOfSlides = e.wrapperEl.querySelectorAll(".swiper-slide").length;
      select('.section-sliderinfo-button-row__counter').innerHTML += ' of ' + numOfSlides;
    }
  }
});

$(document).ready(function () {
  try {
    select('.wrapper').classList.add('loaded');
    // MENU BURGER
    select('.icon-menu').addEventListener('click', e => {
      e.currentTarget.classList.toggle('active');
      select('.menu-body').classList.toggle('active');
      select('body').classList.toggle('lock');
      if (select('.dots-menu')) {
        $('.dots-menu').removeClass('active');

      }
    });
    ibg();
    sidebarDots();
    showMore();
    modal('[data-info]', '.modal');
    listAdd();
    document.addEventListener('click', openDotsMenu);
  } catch (error) {
    console.log(error);
  }

});
//INTERACTIVE BACKGROUND
function ibg() {
  selectAll('.ibg').forEach(ibg => {
    if (ibg.querySelector('img')) {
      ibg.style.backgroundImage = `url(${ibg.querySelector('img').getAttribute('src')})`;
    }
  });
}
function sidebarDots() {
  try {
    select('.dots').addEventListener('click', e => {
      const addBtn = select('.add');
      const list = select('.sidebar-list');

      addBtn.classList.toggle('active');
      e.currentTarget.classList.toggle('active');
      list.classList.toggle('active');
      if (list.matches('.active')) {
        list.style.maxHeight = list.scrollHeight + 68 + 92 + 'px';
      }
      else {
        list.style.maxHeight = '0px';
      }
    });
  } catch (e) {

  }

}
function showMore() {
  $("#tranding-list li").slice(0, 12).show();
  if ($("#tranding-list li:hidden").length != 0) {
    $("#loadMore").show();
  }
  $("#loadMore").on('click', function (e) {
    e.preventDefault();
    $("#tranding-list li:hidden").slice(0, 12).slideDown();
    if ($("#tranding-list li:hidden").length == 0) {
      $("#loadMore").fadeOut('slow');
    }
  });
}
function hideModal(modalSelector) {
  let modal = select(modalSelector);
  modal.classList.remove('show');
}
function showModal(modalSelector) {
  let modal = select(modalSelector);
  modal.classList.add('show');
}
const modalContent = {
  trending: {
    title: 'Trending Lists: What are they?',
    imgSrc: 'img/popups/trending.jpg',
    alt: '1',
    text: 'Trending Lists highlights two types of lists to help you explore: first are lists that are new to the app, followed by lists that are most popular with Robinhood customers. New lists are designated as ‘new’ for 6 months before they are removed from this section.',
    subtitle: 'These are for informational purposes and are not recommendations.'
  }
};
let emojiGlobal = create('div');
function modal(triggerSelector, modalSelector) {
  const modal = select(modalSelector),
    modalDialog = modal.querySelector('.modal__content');

  function setEmojiPopup() {
    const emoji = create('div');
    emoji.classList.add('emoji-modal');
    let x = 0;
    let y = 0;
    for (i = 1; i <= 400; i++) {
      emoji.innerHTML += `
            <div style="background-position: ${x}px ${y}px" class="light-icon">
            </div>`;
      x = x - 56;
      if (i % 39 == 0) {
        y = y - 56;
        x = 0;
      }
    }
    return emoji;
  }
  // Returns background-position of chooseen emoji
  function changeEmoji(el) {
    select('.emoji-modal').addEventListener('click', e => {
      if (e.target != e.currentTarget) {
        let currentPos = e.target.style.backgroundPosition.split('px'),
          currentPosX = +currentPos[0] == 0 ? 0 : +currentPos[0] / 1.55555,
          currentPosY = +currentPos[1] == 0 ? 0 : +currentPos[1] / 1.55555;

        emojiGlobal.style.backgroundPosition = `${currentPosX}px ${currentPosY}px`;
        hideModal(modalSelector);
      }
      el.style.backgroundPosition = emojiGlobal.style.backgroundPosition;
    });
  }
  function sidebarLiSublist() {
    try {
      const sidebarList = select('.sidebar .sidebar-list');
      sidebarList.addEventListener('click', e => {
        if (e.target.matches('.head')) {
          selectAll('.sidebar .sidebar-list li').forEach(el => {
            if (e.target.parentElement != el) {
              el.classList.remove('active');
            }
          });
          e.target.parentElement.classList.toggle('active');

        }
        if (e.target.matches('.head .arrow')) {
          e.target.parentElement.parentElement.classList.toggle('active');
        }
        if (e.target.closest('.dots-menu-menu__item')) {
          switch (e.target.closest('.dots-menu-menu__item').getAttribute('data-dots-action')) {
            case 'edit':
              const additionalModal = select('.additional-modal'),
                form = additionalModal.querySelector('.additional-modal-form');
              let currentLi = '';
              currentLi = e.target.closest('li'),
                liText = currentLi.querySelector('.title'),
                liImg = currentLi.querySelector('.head-img-wrapper div');
              const setPopup = function (e) {
                select('.additional-modal-form-row__img div').style.backgroundPosition = liImg.style.backgroundPosition;
                emojiGlobal.style.backgroundPosition = liImg.style.backgroundPosition;
                additionalModal.classList.add('active');
                form.addEventListener('submit', replaceTextAndImgOnSubmit);
              };
              setPopup(e);
              function replaceTextAndImgOnSubmit(e) {
                const inputVal = form.querySelector('input').value;
                liText.textContent = inputVal;
                additionalModal.classList.remove('active');
                e.target.reset();
                changeEmoji(liImg);
                liImg.style.backgroundPosition = emojiGlobal.style.backgroundPosition;
                form.removeEventListener('submit', replaceTextAndImgOnSubmit);
              }
              additionalModal.addEventListener('click', e => {
                if (e.target.matches('.additional-modal')) {
                  e.target.classList.remove('active');
                  form.reset();
                }
              });

            case 'move':
              $(function () {
                $(".move-modal ul").sortable();
                $(".move-modal ul").disableSelection();
              });
              break;

            case 'delete':
              e.target.closest('li').remove();
              break;

            default:

          }
          e.target.closest('.dots-menu').classList.remove('active');
        }
      });
    } catch (error) {

    }

  }
  sidebarLiSublist();
  function buttonEvent(e) {
    const realTarget = e.target.closest('[data-info]');

    if (realTarget) {
      function renderEditor() {
        modalDialog.innerHTML = `
						<div class="title">Edit Profile</div>
            <form class="edit-profile">
            <div class="profile-img2">
						<input type="file" accept=".jpg, .jpeg, .png .svg" id="uploadImg2">
						<img src="${select('.profile-img img').src}" alt="icon">
						<div class="addInCircle" data-trigger="openFileInput2">
							<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path clip-rule="evenodd"
									d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
									fill="currentColor" fill-rule="evenodd"></path>
								<path d="M11 13V17H13V13H17V11H13V7H11V11H7V13H11Z" fill="currentColor"></path>
							</svg>
						</div>
            </div>
            
            <label for ="name" class ="edit-profile__label">Nickname</label>
            <div class="edit-profile__input">
              <input value="${$('.profile-header-row-info__name').text()}" type ="text" name = "name" autocomplete = "off">
            </div>
            <label for="username" class ="edit-profile__label">Username</label>
            <div class="edit-profile__input">
              <input value="${$('.profile-header-row-info__additional .login').text()}" type = "text" name="username" autocomplete = "off">
            </div>
            <label>Theme</label>
            <div class="edit-profile-colors">
              <button type="button" class="edit-profile-colors__color active"></button>
              <button type="button" class="edit-profile-colors__color"></button>
              <button type="button" class="edit-profile-colors__color"></button>
              <button type="button" class="edit-profile-colors__color"></button>
              <button type="button" class="edit-profile-colors__color"></button>
              <button type="button" class="edit-profile-colors__color"></button>
              <button type="button" class="edit-profile-colors__color"></button>
            </div>
            
            <div class="edit-profile__btn">
              <button type="submit">Save Changes</button>
            </div>
            </form>
        `
      }
      function renderEmoji() {
        modalDialog.innerHTML = `
						<div class="title">Emoji</div>
					`;
        modalDialog.append(setEmojiPopup());
        changeEmoji(realTarget);
      }
      function renderContent(section) {
        modalDialog.innerHTML = `
				<div class="modal__title">${modalContent[section].title}</div>
				<img src="${modalContent[section].imgSrc}" alt="${modalContent[section].alt}">
				<div class="modal__text"></div>
					${modalContent[section].text}
				</div>
				<div class="modal__subtitle">
				${modalContent[section].subtitle}
				</div>`;
      }
      function setMovePopup() {
        const move = create('div'),
          moveList = create('ul'),
          btn = create('button');

        move.classList.add('move-modal');
        let sidebarLiList = selectAll('.sidebar-list li');
        sidebarLiList.forEach((li, key) => {
          key++;
          moveList.innerHTML += `
          <li data-id = ${key}>
          <div class="head__link">
            ${li.querySelector('.head__link').innerHTML}
          </div>
          </li>
          `;
        });
        move.append(moveList);
        btn.classList.add('move-modal__btn');
        btn.textContent = "Done";
        move.append(btn);
        return move;
      }
      function renderMoveList() {
        modalDialog.innerHTML = `
						<div class="title">Rearange Lists</div>
					`;
        modalDialog.append(setMovePopup());
      }
      switch (realTarget.getAttribute('data-info')) {
        case 'editor':
          renderEditor();
          $('.edit-profile-colors__color').on('click', function () {
            $(this)
              .addClass('active').siblings().removeClass('active');
          });
          select('.edit-profile').addEventListener('submit', e => {
            e.preventDefault();

            select('.profile-header-row-info__name')
              .textContent = e.target.querySelector('input[name="name"]').value;

            select('.profile-header-row-info__additional .login')
              .textContent = e.target.querySelector('input[name="username"]').value
                .replace(/\s/img, '');


            let selectedColour = $('.edit-profile-colors__color.active').css('background-color');
            $('head style[title="colorTheme"]').remove();
            const colorStyles = create('style');
            colorStyles.title = "colorTheme";
            colorStyles.innerHTML += `
              .main-profile {
              --mainColor:  ${selectedColour};
              --secondColor: ${selectedColour.replace(/^rgb/, 'rgba').replace(/\)/, ', 0.2)').replace(/\s/g, '')};
              --hoverColor: ${selectedColour.replace(/^rgb/, 'rgba').replace(/\)/, ', 0.9)').replace(/\s/g, '')};
              }
           `;
            select('head').append(colorStyles);
            select('.profile-img img').src = select('.profile-img2 img').src;
            hideModal(modalSelector);
          });
          uploadImg('#uploadImg2', '.profile-img2 img');

          break;
        case 'emoji':
          renderEmoji();
          break;
        case 'move':
          renderMoveList();
          const idArray = [];

          select('.move-modal__btn').addEventListener('click', e => {
            const modalLiList = selectAll('.move-modal ul li');
            modalLiList.forEach(li => {
              idArray.push(li.getAttribute('data-id'));
            });
            const itemsList = selectAll('.sidebar-list li');

            var sortable = [];
            const sidebarList = select('.sidebar-list');
            idArray.forEach((e) => {
              sidebarList.append(itemsList[e - 1]);
            });
            hideModal(modalSelector);
          });
          break;
        case 'trending':
          renderContent('trending');
          break;

        default:
          hideModal(modalSelector);
      }
      showModal(modalSelector);
    }
  }
  document.addEventListener('click', buttonEvent);

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      hideModal(modalSelector);
    }
  });
  document.body.addEventListener('keydown', (e) => {
    if (e.code == "Escape" && modal.matches('.show')) {
      hideModal(modalSelector);
    }
  });
}
function openDotsMenu(e) {
  if (e.target.matches('#liSubmenu span')) {
    e.target.nextElementSibling.classList.toggle('active');
  }
  if (e.target.closest('.dots-menu > svg') || e.target.matches('.dots-menu .dots-menu-wrapper')) {
    e.target.closest('.dots-menu').classList.toggle('active');
  }
}
function listAdd() {
  try {
    function appendNewListItem(listSelector, inputVal, pos) {
      const list = select(listSelector);
      const li = create('li');
      li.innerHTML = `
      <div class="head">
				<a href="#" class="head__link">
						<div class="head-img-wrapper">
						<div class="light-icon" style="background-position:${pos}; background-image: url('./img/loadOfIcons.png');">
						</div>
					</div>
							<div class="title">${inputVal}</div>
				</a>
				<div class="item-news-top-panel__dots-menu dots-menu">
					<svg fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M6.5 10.5H3.5V13.5H6.5V10.5Z" fill="currentColor" />
						<path d="M13.5 10.5H10.5V13.5H13.5V10.5Z" fill="currentColor" />
						<path d="M17.5 10.5H20.5V13.5H17.5V10.5Z" fill="currentColor" />
					</svg>
					<div class="dots-menu-wrapper"></div>
					<div class="dots-menu-menu sidebar-dots">
						<div class="dots-menu-menu__item" data-dots-action="edit">
							<svg fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
									fill="currentColor" />
								<path clip-rule="evenodd"
									d="M19.6 9.6L22 10V14L19.6 14.4C19.5 14.8 19.3 15.3 19.1 15.7L20.5 17.7L17.7 20.5L15.7 19.1C15.3 19.3 14.9 19.5 14.4 19.6L14 22H10L9.6 19.6C9.2 19.5 8.7 19.3 8.3 19.1L6.3 20.5L3.5 17.7L4.9 15.7C4.7 15.3 4.5 14.9 4.4 14.4L2 14V10L4.4 9.6C4.5 9.2 4.7 8.7 4.9 8.3L3.5 6.3L6.3 3.5L8.3 4.9C8.7 4.7 9.2 4.5 9.6 4.4L10 2H14L14.4 4.4C14.8 4.5 15.3 4.7 15.7 4.9L17.7 3.5L20.5 6.3L19.1 8.3C19.3 8.7 19.5 9.1 19.6 9.6ZM12 17.5C15.0376 17.5 17.5 15.0376 17.5 12C17.5 8.96243 15.0376 6.5 12 6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5Z"
									fill="currentColor" fill-rule="evenodd" />
							</svg>
							Edit list
						</div>
						<div class="dots-menu-menu__item" data-dots-action="move" data-info="move">
							<svg fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M6 6H9V9H6V6Z" fill="currentColor" />
								<path d="M15 6H18V9H15V6Z" fill="currentColor" />
								<path d="M9 15H6V18H9V15Z" fill="currentColor" />
								<path d="M15 15H18V18H15V15Z" fill="currentColor" />
							</svg>
							Rearrange list
						</div>
						<div class="dots-menu-menu__item" data-dots-action="delete">
							<svg fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path clip-rule="evenodd"
									d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
									fill="currentColor" fill-rule="evenodd" />
								<path
									d="M12 13.4142L15.182 16.5962L16.5962 15.182L13.4142 12L16.5962 8.81805L15.182 7.40383L12 10.5858L8.81802 7.40378L7.40381 8.81799L10.5858 12L7.40381 15.182L8.81802 16.5962L12 13.4142Z"
									fill="currentColor" />
							</svg>
							Delete list
						</div>
					</div>
				</div>
				<img class="arrow" src="img/icons/arrowRight.svg" alt="arrowBottom">
			</div>
      <div class="head__crypt crypt">
          				<div class="crypt-inner">
          					<span></span>
          					<svg height="16" width="60">
          						<g>
          							<g>
          								<path fill="red"></path>
          							</g>
          						</g>
          					</svg>
          					<div class="crypt__price">
          						<p></p>
          						<span></span>
          					</div>
          				</div>
          			</div>
  `;
      list.prepend(li);
    }
    const additional = select('.sidebar .additional'),
      additionalForm = select('.sidebar .additional-form'),
      cancelBtn = additionalForm.querySelector('.additional-form-buttons button');

    additional.addEventListener('click', e => {
      if (e.target.matches('.additional')) {
        e.target.classList.toggle('active');
        additionalForm.reset();
      }
    });

    cancelBtn.addEventListener('click', e => {
      additionalForm.reset();
      additionalForm.parentElement.classList.toggle('active');
    });
    select('.sidebar .add').addEventListener('click', e => {
      select('sidebar .additional').classList.toggle('active');
    });
    additionalForm.addEventListener('submit', e => {
      e.preventDefault();
      additionalForm.parentElement.classList.toggle('active');
      const input = additionalForm.querySelector('input'),
        imgPos = additionalForm.querySelector('.additional-form-row__img div').style.backgroundPosition;
      appendNewListItem('.sidebar-list', input.value, imgPos);
      additionalForm.reset();
      additionalForm.querySelector('.additional-form-row__img div').style.backgroundPosition = '';
      select('.sidebar-list').style.maxHeight = select('.sidebar-list').scrollHeight + 68 + 'px';
    });
  } catch (error) {

  }

}


$(function () {

  $(".profile-tabs__disclamer .showMore").on('click', function () {
    $(this).parent().toggleClass('abbreviated');
  });

  $('.profile-tab').on('click', function () {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('.profile-tabs').find('.profile-tabs-content').removeClass('active').eq($(this).index()).addClass('active');
  });
  $('.profile-tab').eq(0).trigger('click');

  $('body').on('click', '[data-trigger]', function () {
    if ($(this).data('trigger') == 'openFileInput') {
      $('#uploadImg').trigger('click');
    } else if ($(this).data('trigger') == 'openFileInput2') {
      $('#uploadImg2').trigger('click');
    }
  });


  uploadImg('#uploadImg', '.profile-img img');
});
function uploadImg(inputSelector, targetSelector) {
  $(inputSelector).on('change', function () {
    var selectedFile = this.files[0];
    var reader = new FileReader();
    var imgtag = select(targetSelector);
    imgtag.title = selectedFile.name;

    reader.onload = function (event) {
      imgtag.src = this.result;
    };

    reader.readAsDataURL(selectedFile);
    select(targetSelector).src = '';
  });
}
if ($('.section-appearance .droplist').length > 0) {
  $('.section-appearance .droplist').on('click', '.droplist__title, .droplist__close-wrapper, .droplist__list li', function (e) {
    $(this).closest('.droplist').toggleClass('active');
    if ($(this).is('li')) {
      $(this).addClass('active').siblings().removeClass('active');
      $(this).parent().prev().text($(this).text());
    }
  });
}


if ($('.bigmodal-trigger > .title').length > 0) {
  $('.bigmodal-trigger > .title').on('click', function (e) {
    $(this).next().toggleClass('active');
    $('body').toggleClass('lock');
  });
}
if ($('.bigmodal-trigger .modal-big__close').length > 0) {
  $('.bigmodal-trigger .modal-big__close').on('click', function (e) {
    $(this).parent().toggleClass('active');
    $('body').toggleClass('lock');
  });
}


