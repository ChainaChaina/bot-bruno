const puppeteer = require("puppeteer");
const XLSX = require("xlsx");

async function main() {
  var workbook = XLSX.readFile("relatorio.xls");
  const wb = XLSX.readFile("relatorio.xls");
  const ws = wb.Sheets[wb.SheetNames[0]];
  let data = XLSX.utils.sheet_to_json(ws);

  try {
    // Configures puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    //Navigates to Whatsapp
    await page.goto("https://web.whatsapp.com/");
    page.waitForSelector('header[data-testid="chatlist-header"]')
    console.log('ok')
    // //Searches person by title
    await delay(30000);

    for (let i = 0; i != data.length; i++) {
      var contactName = (data[i].Aluno)
      var contactNumber = (data[i].Telefone)
      await page.click(`div[title='Caixa de texto de pesquisa']`)
      await page.keyboard.type(`${contactNumber}`)
      await page.keyboard.press('Enter');
      console.log(contactName)
      await delay(1000);
      await page.waitForSelector(`div[title="Caixa de texto de pesquisa"]`);
      await page.keyboard.type('BOA NOITE MEU QUERIDO TA ENCHENDO A CARA NO ANO NOVO NÉ? PAGA O BOLETO AGORA')
      await page.keyboard.press('Enter');
      await delay(4000);
    }
    return 0

  } catch (e) {
    console.error("error mine", e);
  }
};

main()

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}