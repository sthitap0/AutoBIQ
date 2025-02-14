import type { MajorTask } from '../types/task';

export const mockTasks: MajorTask[] = [
  {
    id: '1',
    title: 'User Login Flow',
    baseWebsite: 'https://example.com/login',
    subtasks: [
      {
        id: '1-1',
        description: 'Navigate to login page',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
      },
      {
        id: '1-2',
        description: 'Enter valid credentials',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1555421689-491a97ff2040'
      },
      {
        id: '1-3',
        description: 'Verify successful login',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'
      }
    ]
  },
  {
    id: '2',
    title: 'Product Search and Filters',
    baseWebsite: 'https://example.com/products',
    subtasks: [
      {
        id: '2-1',
        description: 'Search for "wireless headphones"',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
      },
      {
        id: '2-2',
        description: 'Apply price filter $50-$200',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1583394838336-acd977736f90'
      },
      {
        id: '2-3',
        description: 'Sort by customer rating',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0'
      }
    ]
  },
  {
    id: '3',
    title: 'Checkout Process',
    baseWebsite: 'https://example.com/cart',
    subtasks: [
      {
        id: '3-1',
        description: 'Add item to cart',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1557821552-17105176677c'
      },
      {
        id: '3-2',
        description: 'Fill shipping details',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366'
      },
      {
        id: '3-3',
        description: 'Complete payment',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3'
      }
    ]
  },
  {
    id: '4',
    title: 'User Registration',
    baseWebsite: 'https://example.com/register',
    subtasks: [
      {
        id: '4-1',
        description: 'Fill registration form',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f'
      },
      {
        id: '4-2',
        description: 'Verify email validation',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa'
      }
    ]
  },
  {
    id: '5',
    title: 'Password Reset Flow',
    baseWebsite: 'https://example.com/reset-password',
    subtasks: [
      {
        id: '5-1',
        description: 'Request password reset',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1633265486064-086b219458ec'
      },
      {
        id: '5-2',
        description: 'Set new password',
        status: 'pending',
        screenshot: 'https://images.unsplash.com/photo-1633265486501-46e9a68427de'
      }
    ]
  }
];

export const initialLabels = [
  {
    id: 'smoke',
    name: 'Smoke',
    color: 'green',
    testcases: ['1', '2'] // Login and Search are critical smoke tests
  },
  {
    id: 'regression',
    name: 'Regression',
    color: 'purple',
    testcases: ['3', '4', '5'] // Checkout, Registration, and Password Reset
  },
  {
    id: 'critical',
    name: 'Critical Path',
    color: 'red',
    testcases: ['1', '3'] // Login and Checkout are critical flows
  },
  {
    id: 'security',
    name: 'Security',
    color: 'blue',
    testcases: ['1', '4', '5'] // Login, Registration, and Password Reset are security-related
  },
  {
    id: 'ui',
    name: 'UI/UX',
    color: 'yellow',
    testcases: ['2'] // Product Search has UI-heavy interactions
  }
];