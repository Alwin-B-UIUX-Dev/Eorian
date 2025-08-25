import { RegisterUserDto } from '@/dtos';

describe('RegisterUserDto', () => {
  describe('Valid data', () => {
    it('should create DTO with valid user data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        username: 'testuser'
      };

      const dto = new RegisterUserDto(validData);

      expect(dto.email).toBe('test@example.com');
      expect(dto.password).toBe('SecurePass123!');
      expect(dto.username).toBe('testuser');
    });
  });

  describe('Invalid data', () => {
    it('should throw error with invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'SecurePass123!',
        username: 'testuser'
      };

      expect((): RegisterUserDto => new RegisterUserDto(invalidData)).toThrow();
    });

    it('should throw error with missing fields', () => {
      const incompleteData = {
        email: 'test@example.com'
        // password et username manquants
      };

      expect((): RegisterUserDto => new RegisterUserDto(incompleteData)).toThrow();
    });
  });
});
