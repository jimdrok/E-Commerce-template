import styled, { keyframes, css } from 'styled-components';
import { Card, Button, Container, Alert, Badge, Navbar } from 'react-bootstrap';

// Animaciones
export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Componentes de Layout
export const StyledContainer = styled(Container)`
  padding: 2rem 0;
  max-width: 1200px;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

export const HeroSection = styled.section`
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%);
  color: white;
  padding: 80px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const HeroImage = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  aspect-ratio: 16/10;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
    aspect-ratio: 16/9;
  }
`;

// Componentes de Navegación
export const StyledNavbar = styled(Navbar)`
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  box-shadow: 0 4px 20px rgba(30, 58, 138, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const NavBrand = styled(Navbar.Brand)`
  color: white !important;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  background: linear-gradient(45deg, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const NavLink = styled.a`
  color: ${props => props.$isActive ? 'white' : 'rgba(255, 255, 255, 0.9)'} !important;
  font-weight: 500;
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 25px;
  margin: 0 4px;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  background-color: ${props => props.$isActive ? 'rgba(149, 149, 149, 0.12)' : 'transparent'};
  box-shadow: ${props => props.$isActive ? '0 2px 8px rgba(255, 255, 255, 0.2)' : 'none'};

  &:hover {
    background-color: rgba(255, 255, 255, 0.15) !important;
    color: white !important;
    transform: translateY(-1px);
  }

  ${props => props.$isActive && css`
    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 2px;
      background-color: white;
      border-radius: 2px;
    }
  `}
`;

export const CartButton = styled.a`
  color: white !important;
  padding: 8px 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  background-color: ${props => props.$isActive ? 'rgba(149, 149, 149, 0.12)' : 'transparent'};
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15) !important;
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

export const CartBadge = styled(Badge)`
  background-color: #ef4444 !important;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 6px;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
  animation: ${props => props.$hasItems ? css`${pulse} 2s infinite` : 'none'};
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Componentes de Productos
export const ProductCard = styled(Card)`
  border: none;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: white;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
  }
`;

export const ProductImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #f8fafc;
  border-radius: 16px 16px 0 0;
`;

export const ProductImage = styled(Card.Img)`
  width: 100%;
  height: 220px;
  object-fit: cover;
  padding: 0;
  transition: transform 0.3s ease;
  background-color: transparent;
  border-radius: 16px 16px 0 0;
  display: block;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ProductBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(37, 99, 235, 0.1);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #2563eb;
  border: 1px solid rgba(37, 99, 235, 0.2);
`;

export const ProductBody = styled(Card.Body)`
  padding: 1.5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const ProductTitle = styled(Card.Title)`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.4;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8rem;
  flex-grow: 1;
`;

export const ProductPrice = styled(Card.Text)`
  color: #2563eb;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 0;
  background: linear-gradient(45deg, #2563eb, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const ShippingBadge = styled.div`
  font-size: 0.8rem;
  color: #10b981;
  font-weight: 600;
  background-color: rgba(16, 185, 129, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

// Componentes de Botones
export const PrimaryButton = styled(Button)`
  background: linear-gradient(45deg, #2563eb, #3b82f6) !important;
  border: none;
  border-radius: 25px;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(37, 99, 235, 0.4);
    background: linear-gradient(45deg, #1d4ed8, #2563eb) !important;
  }

  &:focus {
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: transparent !important;
  color: #2563eb !important;
  border: 2px solid #2563eb !important;
  border-radius: 25px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #2563eb !important;
    color: white !important;
    transform: scale(1.02);
  }

  &:focus {
    background-color: #2563eb !important;
    color: white !important;
    box-shadow: 0 0 0 0.2rem rgba(37, 99, 235, 0.25);
  }
`;

export const AddToCartButton = styled(Button)`
  background: linear-gradient(45deg, #2563eb, #3b82f6) !important;
  border: none;
  border-radius: 25px;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 0.95rem;
  color: white;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
    background: linear-gradient(45deg, #1d4ed8, #2563eb) !important;
  }

  &:focus {
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
  }
`;

// Componentes de Alertas
export const SuccessAlert = styled(Alert)`
  background-color: #dcfce7 !important;
  border: 1px solid #bbf7d0 !important;
  border-radius: 16px;
  padding: 1rem 1.5rem;
  color: #166534 !important;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  animation: ${slideIn} 0.3s ease-out;
`;

export const ErrorAlert = styled(Alert)`
  background-color: #fef2f2 !important;
  border: 1px solid #fecaca !important;
  border-radius: 16px;
  padding: 1rem 1.5rem;
  color: #dc2626 !important;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  animation: ${slideIn} 0.3s ease-out;
`;

export const WarningAlert = styled(Alert)`
  background-color: #fef3c7 !important;
  border: 1px solid #fbbf24 !important;
  border-radius: 16px;
  padding: 1rem 1.5rem;
  color: #92400e !important;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  animation: ${slideIn} 0.3s ease-out;
`;

// Componentes de Loading
export const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1.5rem;
`;

export const LoadingContainer = styled(Container)`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
`;

export const LoadingText = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  font-weight: 500;
`;

// Componentes de Footer
export const StyledFooter = styled.footer`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: white;
  margin-top: auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa, #3b82f6, #2563eb);
    background-size: 200% 100%;
    animation: ${gradient} 3s ease infinite;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
`;

export const FooterContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: right;
  padding: 1rem 0;

  p {
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    font-size: 0.9rem;
  }
`;

// Componentes de Secciones
export const CategoriesSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const SectionDescription = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 4rem auto;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0 auto 3rem auto;
    padding: 0 1rem;
  }
`;

export const PromoSection = styled.section`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: white;
  padding: 40px 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 30px 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.03'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E");
  }
`;

export const PromoContent = styled.div`
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  text-align: center;
  position: relative;
  z-index: 2;
`;

export const PromoTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #3b82f6, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const PromoDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  span {
    font-size: 0.9rem;
    opacity: 0.8;

    @media (max-width: 768px) {
      font-size: 0.85rem;
    }
  }
`;