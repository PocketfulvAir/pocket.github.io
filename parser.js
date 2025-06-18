const input = document.getElementById('imageInput');
const result = document.getElementById('result');
const status = document.getElementById('status');

input.addEventListener('change', async () => {
  const file = input.files[0];
  if (!file) return;

  status.textContent = 'Reading image...';
  result.textContent = '';

  const reader = new FileReader();
  reader.onload = async () => {
    status.textContent = 'Running OCR...';

    const { data: { text } } = await Tesseract.recognize(
      reader.result,
      'eng',
      {
        logger: m => status.textContent = `Progress: ${Math.round(m.progress * 100)}%`
      }
    );

    status.textContent = 'OCR complete.';
    result.textContent = text.trim();
  };

reader.readAsDataURL(file);
