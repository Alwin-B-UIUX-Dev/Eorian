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
}
