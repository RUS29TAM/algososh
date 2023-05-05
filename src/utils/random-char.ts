export const randomChar = () => {
    let charCode = Math.floor(Math.random() * 25) + 97; // генерирует случайное значение от 97 до 122 (значения ASCII для строчных букв)
    return String.fromCharCode(charCode);
}
