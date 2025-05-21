export function formatUsernameFromEmail(email) {
    if (!email) return 'User';
  
    // Extract the part before the @ symbol
    const usernamePart = email.split('@')[0];
  
    // Split into parts: separate letters and numbers (e.g., 'eaolusegun376' -> ['ea', 'olusegun', '376'])
    const parts = usernamePart.split(/(?<=\D)(?=\d)|(?<=\d)(?=\D)/).filter(Boolean);
  
    // Remove number-only parts and clean non-letter characters
    const letterParts = parts.filter(p => /[a-zA-Z]/.test(p)).map(p => p.replace(/\d+/g, ''));
  
    if (letterParts.length >= 2) {
      const initials = letterParts[0]
        .slice(0, 2)
        .toUpperCase()
        .split('')
        .map(c => `${c}.`)
        .join('');
      
      const lastName = letterParts[1];
      const formattedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  
      return `${initials} ${formattedLastName}`; // E.A Olusegun
    }
  
    // Fallback: just capitalize the first letter of the username
    return usernamePart.charAt(0).toUpperCase() + usernamePart.slice(1);
  }
  