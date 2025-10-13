import random
from datetime import datetime, timedelta
from typing import Dict, Optional, Tuple
from dataclasses import dataclass
from config import Config

@dataclass
class VerificationCode:
    code: str
    email: str
    user_id: int
    expires_at: datetime
    created_at: datetime

@dataclass
class UserData:
    discord_id: int
    email: str
    verified: bool
    last_request_time: Optional[datetime] = None

class CodeManager:
    def __init__(self):
        self.verification_codes: Dict[int, VerificationCode] = {}
        self.user_data: Dict[int, UserData] = {}
    
    def generate_code(self) -> str:
        """Generate a random 6-digit code."""
        return str(random.randint(100000, 999999))
    
    def create_verification_code(self, user_id: int, email: str) -> str:
        """Create a new verification code for a user."""
        # Remove any existing code for this user
        self.verification_codes.pop(user_id, None)
        
        code = self.generate_code()
        expires_at = datetime.now() + timedelta(minutes=Config.CODE_EXPIRATION_MINUTES)
        
        verification_code = VerificationCode(
            code=code,
            email=email,
            user_id=user_id,
            expires_at=expires_at,
            created_at=datetime.now()
        )
        
        self.verification_codes[user_id] = verification_code
        return code
    
    def verify_code(self, user_id: int, code: str) -> Tuple[bool, str]:
        """Verify a code for a user. Returns (success, message)."""
        stored_code = self.verification_codes.get(user_id)
        
        if not stored_code:
            return False, 'No verification code found. Please request a new code.'
        
        if datetime.now() > stored_code.expires_at:
            del self.verification_codes[user_id]
            return False, 'Verification code has expired. Please request a new code.'
        
        if stored_code.code != code:
            return False, 'Invalid verification code. Please try again.'
        
        # Code is valid - mark user as verified
        self.user_data[user_id] = UserData(
            discord_id=user_id,
            email=stored_code.email,
            verified=True
        )
        
        del self.verification_codes[user_id]
        return True, 'Email verified successfully!'
    
    def can_request_code(self, user_id: int) -> Tuple[bool, Optional[str]]:
        """Check if a user can request a new code. Returns (allowed, message)."""
        user = self.user_data.get(user_id)
        
        if user and user.last_request_time:
            time_since_last = datetime.now() - user.last_request_time
            rate_limit = timedelta(minutes=Config.RATE_LIMIT_MINUTES)
            
            if time_since_last < rate_limit:
                minutes_left = int((rate_limit - time_since_last).total_seconds() / 60) + 1
                return False, f'Please wait {minutes_left} minute(s) before requesting another code.'
        
        return True, None
    
    def update_last_request_time(self, user_id: int, email: str):
        """Update the last request time for a user."""
        user = self.user_data.get(user_id)
        if user:
            user.last_request_time = datetime.now()
        else:
            self.user_data[user_id] = UserData(
                discord_id=user_id,
                email=email,
                verified=False,
                last_request_time=datetime.now()
            )
    
    def is_user_verified(self, user_id: int) -> bool:
        """Check if a user is verified."""
        user = self.user_data.get(user_id)
        return user.verified if user else False
    
    def get_user_email(self, user_id: int) -> Optional[str]:
        """Get the email for a verified user."""
        user = self.user_data.get(user_id)
        return user.email if user else None
    
    def cleanup_expired_codes(self):
        """Remove expired verification codes."""
        now = datetime.now()
        expired_users = [
            user_id for user_id, code in self.verification_codes.items()
            if now > code.expires_at
        ]
        for user_id in expired_users:
            del self.verification_codes[user_id]
