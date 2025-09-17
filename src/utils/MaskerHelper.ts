export class MaskerHelper {
  public static MaskClientIP(ip: string): string {
    if (!ip) return '***';

    // IPv4
    if (ip.includes('.')) {
      const parts: string[] = ip.split('.');
      if (parts.length === 4) {
        return `${parts[0]}.${parts[1]}.xxx.xxx`;
      }
    }

    // IPv6
    if (ip.includes(':')) {
      const parts: string[] = ip.split(':');
      if (parts.length >= 2) {
        return `${parts[0]}:${parts[1]}:xxxx::xxxx`;
      }
    }

    // Fallback
    return ip.length > 4 ? `${ip.substring(0, 2)}${'*'.repeat(ip.length - 2)}` : '***';
  }

  public static maskPassword(password: string): string {
    return `${'*'.repeat(password.length)}`;
  }

  public static maskToken(token: string): string {
    return `${'*'.repeat(token.length)}`;
  }

  public static maskEmail(email: string): string {
    const parts: string[] = email.split('@');
    if (parts.length === 2) {
      return `${parts[0]}@${'*'.repeat(parts[1].length)}`;
    }
    return email;
  }

  public static maskUsername(username: string): string {
    return `${'*'.repeat(username.length)}`;
  }

  public static maskIdentifier(identifier: string): string {
    if (identifier.includes('@')) {
      return MaskerHelper.maskEmail(identifier);
    }
    return MaskerHelper.maskUsername(identifier);
  }

  public static maskPhone(phone: string): string {
    if (!phone) return '***';

    // Supprimer tous les caractères non numériques
    const cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.length >= 10) {
      // Masquer les 4 chiffres du milieu
      const start = cleanPhone.substring(0, 3);
      const end = cleanPhone.substring(cleanPhone.length - 3);
      return `${start}****${end}`;
    }

    // Pour les numéros plus courts, masquer le milieu
    if (cleanPhone.length >= 6) {
      const start = cleanPhone.substring(0, 2);
      const end = cleanPhone.substring(cleanPhone.length - 2);
      return `${start}****${end}`;
    }

    // Fallback
    return `${'*'.repeat(cleanPhone.length)}`;
  }
}
