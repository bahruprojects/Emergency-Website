function doPost(e) {
  try {
    // ID Spreadsheet Anda
    const SPREADSHEET_ID = '1acQWvGP0tek5coUduTvpLRNqIuDw1oKXwdDDOJUf_G4';
    const SHEET_NAME = 'EMERGENCY_SHEET';
    
    // Buka spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Jika sheet tidak ada, buat baru
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Buat header di baris pertama
      sheet.getRange(1, 1, 1, 10).setValues([[
        'YourName', 'YourIdentity', 'ProveThatWeKnowEachOther?', 
        'YourPhoneNumber', 'YourEmail', 'YourCity', 
        'Whatisyourreasonforcontactingme?', 'Timestamp', 
        'Geolocation', 'Location_URL'
      ]]);
    }
    
    // Debug: Log seluruh parameter yang diterima
    console.log('Received parameter e:', e);
    
    let data = {};
    
    // Coba berbagai cara untuk mendapatkan data
    if (e && e.postData) {
      console.log('Using postData');
      if (e.postData.contents) {
        try {
          data = JSON.parse(e.postData.contents);
          console.log('Parsed JSON data:', data);
        } catch (parseError) {
          console.log('JSON parse failed, trying form data');
          // Jika JSON parsing gagal, coba ambil dari parameter
          data = e.parameter || {};
        }
      } else {
        console.log('Using parameter from postData');
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      console.log('Using parameter directly');
      data = e.parameter;
    } else {
      console.log('No data received');
      throw new Error('No data received in request');
    }
    
    console.log('Final processed data:', data);
    
    // Validasi data minimal
    if (!data.YourName && !data.yourName) {
      throw new Error('YourName is required');
    }
    
    // Function to get Jakarta time
    function getJakartaTimestamp() {
      const now = new Date();
      // Set timezone to Jakarta (GMT+7)
      return Utilities.formatDate(now, "GMT+7", "yyyy-MM-dd HH:mm:ss") + " WIB";
    }
    
    // Normalisasi nama field (handle both formats)
    const normalizedData = {
      YourName: data.YourName || data.yourName || '',
      YourIdentity: data.YourIdentity || data.yourIdentity || '',
      ProveThatWeKnowEachOther: data.ProveThatWeKnowEachOther || data.proveKnowledge || '',
      YourPhoneNumber: data.YourPhoneNumber || data.yourPhone || '',
      YourEmail: data.YourEmail || data.yourEmail || '',
      YourCity: data.YourCity || data.yourCity || '',
      Whatisyourreasonforcontactingme: data.Whatisyourreasonforcontactingme || data.contactReason || '',
      Timestamp: data.Timestamp || getJakartaTimestamp(), // Menggunakan Jakarta timestamp
      Geolocation: data.Geolocation || '',
      Location_URL: data.Location_URL || ''
    };
    
    console.log('Normalized data:', normalizedData);
    
    // Tambah data ke baris baru
    const rowData = [
      normalizedData.YourName,
      normalizedData.YourIdentity,
      normalizedData.ProveThatWeKnowEachOther,
      normalizedData.YourPhoneNumber,
      normalizedData.YourEmail,
      normalizedData.YourCity,
      normalizedData.Whatisyourreasonforcontactingme,
      normalizedData.Timestamp,
      normalizedData.Geolocation,
      normalizedData.Location_URL
    ];
    
    sheet.appendRow(rowData);
    console.log('Data successfully added to spreadsheet');
    
    // Return success response (tanpa setHeaders)
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        message: 'Data berhasil disimpan',
        timestamp: getJakartaTimestamp()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: error.toString(),
        timestamp: new Date().toLocaleString('id-ID', {timeZone: 'Asia/Jakarta'})
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    console.log('doGet called with parameter:', e);
    
    // Function to get Jakarta time
    function getJakartaTimestamp() {
      const now = new Date();
      return Utilities.formatDate(now, "GMT+7", "yyyy-MM-dd HH:mm:ss") + " WIB";
    }
    
    // Cek apakah ini request untuk testing
    if (e && e.parameter && e.parameter.test) {
      return testSpreadsheetConnection();
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Google Apps Script is working!',
        timestamp: getJakartaTimestamp(),
        info: 'Send POST request to submit data to spreadsheet'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toLocaleString('id-ID', {timeZone: 'Asia/Jakarta'})
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function testSpreadsheetConnection() {
  try {
    const SPREADSHEET_ID = '1acQWvGP0tek5coUduTvpLRNqIuDw1oKXwdDDOJUf_G4';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('EMERGENCY_SHEET');
    
    // Function to get Jakarta time
    function getJakartaTimestamp() {
      const now = new Date();
      return Utilities.formatDate(now, "GMT+7", "yyyy-MM-dd HH:mm:ss") + " WIB";
    }
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet('EMERGENCY_SHEET');
      sheet.getRange(1, 1, 1, 10).setValues([[
        'YourName', 'YourIdentity', 'ProveThatWeKnowEachOther?', 
        'YourPhoneNumber', 'YourEmail', 'YourCity', 
        'Whatisyourreasonforcontactingme?', 'Timestamp', 
        'Geolocation', 'Location_URL'
      ]]);
    }
    
    // Test insert dengan Jakarta timestamp
    sheet.appendRow([
      'Test User', 'Testing', 'This is a test connection', 
      '1234567890', 'test@example.com', 'Test City',
      'Testing spreadsheet connection', getJakartaTimestamp(),
      'Test Location', 'https://maps.google.com'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Spreadsheet connection successful! Test data added.',
        sheetName: 'EMERGENCY_SHEET',
        timestamp: getJakartaTimestamp()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Spreadsheet connection failed'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
