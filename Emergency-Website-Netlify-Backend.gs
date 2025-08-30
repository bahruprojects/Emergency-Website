function doPost(e) {
  try {
    // ID Spreadsheet Anda
    const SPREADSHEET_ID = '1acQWvGP0tek5coUduTvpLRNqIuDw1oKXwdDDOJUf_G4';
    const SHEET_NAME = 'EMERGENCY_SHEET';
    
    // Buka spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Jika sheet tidak ada, buat baru dengan kolom tambahan
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Buat header di baris pertama dengan kolom tambahan K, L, M, N
      sheet.getRange(1, 1, 1, 14).setValues([[
        'YourName', 'YourIdentity', 'ProveThatWeKnowEachOther?', 
        'YourPhoneNumber', 'YourEmail', 'YourCity', 
        'Whatisyourreasonforcontactingme?', 'Timestamp', 
        'Geolocation', 'Location_URL', 'IP_Address', 
        'Network', 'Device', 'Platform'
      ]]);
      
      // Format header
      const headerRange = sheet.getRange(1, 1, 1, 14);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4CAF50');
      headerRange.setFontColor('white');
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
    
    // Normalisasi nama field (handle both formats) dengan kolom tambahan
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
      Location_URL: data.Location_URL || '',
      IP_Address: data.IP_Address || 'N/A', // Kolom K
      Network: data.Network || 'N/A',       // Kolom L  
      Device: data.Device || 'N/A',         // Kolom M
      Platform: data.Platform || 'N/A'      // Kolom N
    };
    
    console.log('Normalized data with additional columns:', normalizedData);
    
    // Tambah data ke baris baru dengan kolom tambahan
    const rowData = [
      normalizedData.YourName,                              // A
      normalizedData.YourIdentity,                          // B
      normalizedData.ProveThatWeKnowEachOther,              // C
      normalizedData.YourPhoneNumber,                       // D
      normalizedData.YourEmail,                             // E
      normalizedData.YourCity,                              // F
      normalizedData.Whatisyourreasonforcontactingme,       // G
      normalizedData.Timestamp,                             // H
      normalizedData.Geolocation,                           // I
      normalizedData.Location_URL,                          // J
      normalizedData.IP_Address,                            // K - New column
      normalizedData.Network,                               // L - New column
      normalizedData.Device,                                // M - New column
      normalizedData.Platform                               // N - New column
    ];
    
    console.log('Row data to be inserted:', rowData);
    
    sheet.appendRow(rowData);
    console.log('Data successfully added to spreadsheet with additional columns');
    
    // Auto-resize columns for better visibility
    sheet.autoResizeColumns(1, 14);
    
    // Return success response (tanpa setHeaders)
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        message: 'Data berhasil disimpan dengan informasi tambahan IP, Network, Device, dan Platform',
        timestamp: getJakartaTimestamp(),
        columns: 'A-N (14 columns total)'
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
        message: 'Google Apps Script is working with enhanced features!',
        timestamp: getJakartaTimestamp(),
        info: 'Send POST request to submit data to spreadsheet',
        features: 'Now includes IP, Network, Device, and Platform detection',
        columns: 'A-N (14 columns total)'
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
      // Create header with new columns K, L, M, N
      sheet.getRange(1, 1, 1, 14).setValues([[
        'YourName', 'YourIdentity', 'ProveThatWeKnowEachOther?', 
        'YourPhoneNumber', 'YourEmail', 'YourCity', 
        'Whatisyourreasonforcontactingme?', 'Timestamp', 
        'Geolocation', 'Location_URL', 'IP_Address', 
        'Network', 'Device', 'Platform'
      ]]);
      
      // Format header
      const headerRange = sheet.getRange(1, 1, 1, 14);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4CAF50');
      headerRange.setFontColor('white');
    }
    
    // Test insert dengan Jakarta timestamp dan kolom tambahan
    sheet.appendRow([
      'Test User',                           // A - YourName
      'Testing',                            // B - YourIdentity
      'This is a test connection',          // C - ProveThatWeKnowEachOther
      '1234567890',                        // D - YourPhoneNumber
      'test@example.com',                  // E - YourEmail
      'Test City',                         // F - YourCity
      'Testing spreadsheet connection',     // G - Reason for contacting
      getJakartaTimestamp(),               // H - Timestamp
      'Test Location',                     // I - Geolocation
      'https://maps.google.com',           // J - Location_URL
      '192.168.1.1',                       // K - IP_Address
      '4g',                                // L - Network
      'Desktop',                           // M - Device
      'Windows 10 - Chrome'                // N - Platform
    ]);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 14);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Spreadsheet connection successful! Test data with enhanced features added.',
        sheetName: 'EMERGENCY_SHEET',
        timestamp: getJakartaTimestamp(),
        columns: 'A-N (14 columns total)',
        newFeatures: ['IP_Address (K)', 'Network (L)', 'Device (M)', 'Platform (N)']
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

// Fungsi tambahan untuk debugging dan monitoring
function getSheetInfo() {
  try {
    const SPREADSHEET_ID = '1acQWvGP0tek5coUduTvpLRNqIuDw1oKXwdDDOJUf_G4';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('EMERGENCY_SHEET');
    
    if (!sheet) {
      return 'Sheet EMERGENCY_SHEET not found';
    }
    
    const lastRow = sheet.getLastRow();
    const lastColumn = sheet.getLastColumn();
    const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
    
    console.log('Sheet Info:');
    console.log('Last Row:', lastRow);
    console.log('Last Column:', lastColumn);
    console.log('Headers:', headers);
    
    return {
      lastRow: lastRow,
      lastColumn: lastColumn,
      headers: headers,
      totalColumns: lastColumn
    };
    
  } catch (error) {
    console.error('Error getting sheet info:', error);
    return 'Error: ' + error.toString();
  }
}
