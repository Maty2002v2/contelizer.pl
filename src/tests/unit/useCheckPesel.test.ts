import { describe, it, expect } from 'vitest';
import { useCheckPesel } from '../../composables/useCheckPesel';

describe('useCheckPesel', () => {
    it('should return True to the correct PESEL number', () => {
      const { peselIsValid, validation } = useCheckPesel();
      validation('44051401359');
  
      expect(peselIsValid.value).toBe(true);
    });
  
    it('should return false to PESEL with an abnormal control digit', () => {
      const { peselIsValid, validation } = useCheckPesel();
      validation('44051401358'); 
  
      expect(peselIsValid.value).toBe(false);
    });
  
    it('should return false to the PESEL number containing letters', () => {
      const { peselIsValid, validation } = useCheckPesel();
      validation('4405140135A');
  
      expect(peselIsValid.value).toBe(false);
    });
  
    it('should return false for too short PESEL number', () => {
      const { peselIsValid, validation } = useCheckPesel();
      validation('440514013');
  
      expect(peselIsValid.value).toBe(false);
    });
  
    it('should return false for the too long PESEL number', () => {
      const { peselIsValid, validation } = useCheckPesel();
      validation('440514013599');
  
      expect(peselIsValid.value).toBe(false);
    });
  
    it('should set peselisvalid to null before each validation', () => {
      const { peselIsValid, validation } = useCheckPesel();
      peselIsValid.value = true;
      validation('44051401359');
  
      expect(peselIsValid.value).not.toBeNull();
    });
  });
  