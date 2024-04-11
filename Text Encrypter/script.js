document.addEventListener('DOMContentLoaded', function () {
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=[]{}|;:'\,.<>?/";

  // Event listener for the Encrypt button
  document.getElementById('enc-btn').addEventListener('click', function () {
    var message = document.getElementById('message').value;
    var key = document.getElementById('key').value;

    if (message && key) {
      var encryptedMessage = encrypt(message, key, charset);
      updateResult(encryptedMessage);
    } else {
      updateResult('Please provide both a message and a key.');
    }
  });

  // Event listener for the Decrypt button
  document.getElementById('dec-btn').addEventListener('click', function () {
    var encryptedMessage = document.getElementById('result').textContent;
    var key = document.getElementById('key').value;

    if (encryptedMessage && key) {
      var decryptedMessage = decrypt(encryptedMessage, key, charset);
      updateResult(decryptedMessage);
    } else {
      updateResult('Please provide both an encrypted message and a key.');
    }
  });

  // Function to update the result element with the given message
  function updateResult(message) {
    document.getElementById('result').textContent = message;
  }

  // Function to encrypt a message with a key using the specified charset
  function encrypt(message, key, charset) {
    var result = '';
    for (var i = 0; i < message.length; i++) {
      var char = message.charAt(i);
      var charIndex = charset.indexOf(char);
      if (charIndex !== -1) {
        var keyChar = key.charAt(i % key.length);
        var keyIndex = charset.indexOf(keyChar);
        var encryptedIndex = (charIndex + keyIndex) % charset.length;
        result += charset.charAt(encryptedIndex);
      } else {
        result += char;
      }
    }
    return result;
  }

  // Function to decrypt an encrypted message with a key using the specified charset
  function decrypt(encryptedMessage, key, charset) {
    var result = '';
    for (var i = 0; i < encryptedMessage.length; i++) {
      var char = encryptedMessage.charAt(i);
      var charIndex = charset.indexOf(char);
      if (charIndex !== -1) {
        var keyChar = key.charAt(i % key.length);
        var keyIndex = charset.indexOf(keyChar);
        var decryptedIndex = (charIndex - keyIndex + charset.length) % charset.length;
        result += charset.charAt(decryptedIndex);
      } else {
        result += char;
      }
    }
    return result;
  }
});
