// Принимает ответы анкеты с сайта и записывает их в эту Google Таблицу.
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Когда ответил', 'Имя и фамилия', 'Придёт?', 'Напитки', 'Трансфер', 'Аллергии / ограничения в еде']);
      sheet.setFrozenRows(1);
    }
    const p = e.parameter;
    sheet.appendRow([new Date(), p.name || '', p.attend || '', p.drinks || '', p.transfer || '', p.food || '']);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}
