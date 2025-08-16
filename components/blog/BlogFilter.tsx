// app/blog/list/components/BlogFilters.tsx
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { categoryService } from '@/services';
import { BlogFilters, Category } from '@/types';
import { CateoryListData } from '@/types';

interface BlogFiltersProps {
  filters: BlogFilters;
  onFilterChange: (filters: any) => void;
}

export const BlogPostFilters = ({
  filters,
  onFilterChange,
}: BlogFiltersProps) => {
  const [categories, setCategories] = useState<CateoryListData[]>([]);
  const [searchDebounce, setSearchDebounce] = useState(filters.search);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Only fetch if API is available
        if (!process.env.NEXT_PUBLIC_API_URL) {
          // Use mock categories for local development
          setCategories([
            { _id: '67387c575e787a952ddf1bae', id: '67387c575e787a952ddf1bae', name: 'Programming', slug: 'programming', isActive: true, order: 1 },
            { _id: '67387ef35e787a952ddf1bb5', id: '67387ef35e787a952ddf1bb5', name: 'JavaScript', slug: 'javascript', isActive: true, order: 2 },
            { _id: '67387f445e787a952ddf1bb9', id: '67387f445e787a952ddf1bb9', name: 'TypeScript', slug: 'typescript', isActive: true, order: 3 },
          ]);
          return;
        }
        
        const response = await categoryService.getCategories();
        const { data, success } = response;

        if (!success) {
          throw new Error('Failed to fetch categories');
        }

        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        // Use mock categories as fallback
        setCategories([
          { _id: '67387c575e787a952ddf1bae', id: '67387c575e787a952ddf1bae', name: 'Programming', slug: 'programming', isActive: true, order: 1 },
          { _id: '67387ef35e787a952ddf1bb5', id: '67387ef35e787a952ddf1bb5', name: 'JavaScript', slug: 'javascript', isActive: true, order: 2 },
          { _id: '67387f445e787a952ddf1bb9', id: '67387f445e787a952ddf1bb9', name: 'TypeScript', slug: 'typescript', isActive: true, order: 3 },
        ]);
      }
    };
    fetchCategories();
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      // onFilterChange({ ...filters, search: searchDebounce });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchDebounce]);

  return (
    <div className='mb-8 space-y-4 bg-white/5 backdrop-blur-sm  p-6 rounded-xl'>
      {/* Search Bar */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400' />
        <Input
          placeholder='Search blogs...'
          value={searchDebounce}
          onChange={(e) => setSearchDebounce(e.target.value)}
          className='pl-9 bg-white/5 border-white/10 focus:border-purple-500'
        />
      </div>

      {/* Category Pills */}
      <div className='flex flex-wrap gap-2'>
        {categories.map((category) => (
          <div key={category._id} className='group/item relative'>
            <div
              className={`absolute inset-0 rounded-full blur-sm transition-all ${
                filters.categories.includes(category._id)
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-white/10'
              }`}
            />
            <Badge
              variant={
                filters.categories.includes(category._id)
                  ? 'default'
                  : 'secondary'
              }
              className='relative cursor-pointer hover:bg-white/10 transition-colors'
              onClick={() => {
                const newCategories = filters.categories.includes(category._id)
                  ? filters.categories.filter((id) => id !== category._id)
                  : [...filters.categories, category._id];
                onFilterChange({ ...filters, categories: newCategories });
              }}
            >
              {category.name}
            </Badge>
          </div>
        ))}
      </div>

      {/* Active Filters */}
      {(filters.search || filters.categories.length > 0) && (
        <div className='flex items-center gap-2 pt-2 border-t border-white/10'>
          <span className='text-sm text-purple-400'>Active filters</span>
          <Button
            variant='ghost'
            size='sm'
            onClick={() =>
              onFilterChange({
                ...filters,
                search: '',
                categories: [],
              })
            }
            className='hover:bg-white/10 hover:text-purple-400'
          >
            Clear all
            <X className='ml-2 h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  );
};
