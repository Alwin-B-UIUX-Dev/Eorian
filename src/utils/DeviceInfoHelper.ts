// utils/device-info.helper.ts
import type { Request } from 'express';
import { type IResult, UAParser } from 'ua-parser-js';
import type { IDeviceInfoData } from '@/types';

/**
 * Helper pour extraction des infos device depuis les headers
 * KISS: Simple extraction basée sur User-Agent
 * YAGNI: Pas de cache ou logique complexe
 */
export class DeviceInfoHelper {
  /**
   * Extrait les infos device depuis la requête
   * Utilisé UNIQUEMENT lors du login pour créer la session
   */
  public static extractFromRequest(req: Request): IDeviceInfoData {
    const userAgent: string = req.headers['user-agent'] ?? 'unknown';
    const parser = new UAParser(userAgent);
    const result: IResult = parser.getResult();
    const deviceInfo: IDeviceInfoData = {
      user_agent: userAgent,
      browser: {
        name: result.browser.name || 'unknown',
        version: result.browser.version || 'unknown'
      },
      engine: {
        name: result.engine.name || 'unknown',
        version: result.engine.version || 'unknown'
      },
      os: {
        name: result.os.name || 'unknown',
        version: result.os.version || 'unknown'
      },
      device: {
        type: result.device.type || 'unknown',
        vendor: result.device.vendor || 'unknown',
        model: result.device.model || 'unknown'
      },
      cpu: {
        architecture: result.cpu.architecture || 'unknown'
      },
      is_touch: DeviceInfoHelper.detectTouchSupport(result),
      detected_at: new Date().toISOString(),
      detection_method: 'server'
    };

    return deviceInfo;
  }

  public static getClientIP(req: Request): string {
    const IPAdress: string =
      // Proxy/Load balancer
      (req.headers['x-forwarded-for'] as string) ||
      (req.headers['x-real-ip'] as string) ||
      // Cloudflare
      (req.headers['cf-connecting-ip'] as string) ||
      // Connection directe
      req.socket.remoteAddress ||
      // Fallback
      '::1';
    return IPAdress;
  }

  /**
   * Détecte le support tactile basé sur le type d'appareil
   */
  private static detectTouchSupport(result: IResult): boolean {
    const deviceType: IResult['device']['type'] = result.device.type;
    const resultTouch: boolean =
      deviceType === 'mobile' || deviceType === 'tablet' || deviceType === 'wearable';
    return resultTouch;
  }
}
