import bot from '/assets/bot.svg';
import user from '/assets/user.svg';

const form = document.querySelector('form')
const chartContainer = document.querySelector('#chat_container')
// console.log(form);

let loadInterval;

function loader(element) {
  element.textContent = '';
  //srtinterver function
  loadInterval = setInterval(() => {
    element.textContent += '.';
    if (element.textContent == '....') {
      element.textContent = '';
    }
  }, 300);
};

function typetext(element, text) {
  let index = 0;
  let intervel = setInterval(() => {
    if (index < text.length) {

      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(intervel);
    }
  }, 20);
};

function uniqueID() {
  const date = Date.now();
  const randomId = Math.random().toString(16);
  return `id-${date}${randomId}`;
};

function chartStripe(isAi, value, uniqueid) {
  return (
    `
     <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
        <div class="profile">
        <img 
        src="${isAi ? bot : user}"
        alt="${isAi ? 'bot' : 'user'}" />
        </div>
        <div class="message" id=${uniqueid}>${value}</div>
      </div>
    </div>
`
  )
};

const heandelSubmit = async (e) => {
  e.preventDefault()
  const selectForm = new FormData(form);
  const data = selectForm.get('promt')
  // console.log(data);
  form.reset();

  //users stripe :
  chartContainer.innerHTML += chartStripe(false, data)

  //Ai stripe :
  const unicqueId = uniqueID();
  // console.log(unicqueId);
  chartContainer.innerHTML += chartStripe(true, '', unicqueId)
  chartContainer.scrollTop = chartContainer.scrollHeight;

  const messageDiv = document.getElementById(unicqueId);
  loader(messageDiv)

  //face data form server
  const responce = await fetch('https://skbot-seven.vercel.app/s', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data
    })
  })
  clearInterval(loadInterval)
  messageDiv.innerHTML = '';

  const Data = await responce.json();
  // console.log(Data.bot.trim());
  const parseData = Data.bot.trim()
  typetext(messageDiv, parseData)
}
form.addEventListener('submit', heandelSubmit)
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    heandelSubmit(e)
  }
})