export function formatUsernameFromEmail(email) {
    if (!email) return 'User';
    
    // Extract the part before @
    const usernamePart = email.split('@')[0];
    
    // Split into parts (eaolusegun376 -> ['ea', 'olusegun376'])
    const parts = usernamePart.split(/(?<=\D)(?=\d)|(?<=\d)(?=\D)/).filter(Boolean);
    
    // Format initials and last name
    if (parts.length >= 2) {
      const initials = parts[0].split('').map(c => `${c.toUpperCase()}.`);
      const lastName = parts[1].replace(/\d+/g, ''); // Remove numbers
      return `${initials} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`;
    }
    
    return usernamePart; // Fallback
  }