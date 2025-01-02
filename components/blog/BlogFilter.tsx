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
        const response = await categoryService.getCategories();
        const { data, success } = response;

        if (!success) {
          throw new Error('Failed to fetch categories');
        }

        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ ...filters, search: searchDebounce });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchDebounce]);

  return (
    <div className='max-w-7xl mx-auto mb-8 space-y-4'>
      {/* Search and Status Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search blogs...'
            value={searchDebounce}
            onChange={(e) => setSearchDebounce(e.target.value)}
            className='pl-9'
          />
        </div>
        <Select
          value={filters.status}
          onValueChange={(value: 'all' | 'published' | 'draft') =>
            onFilterChange({ ...filters, status: value })
          }
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Status</SelectItem>
            <SelectItem value='published'>Published</SelectItem>
            <SelectItem value='draft'>Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Filters */}
      <div className='flex flex-wrap gap-2'>
        {categories.map((category) => (
          <Badge
            key={category._id}
            variant={
              filters.categories.includes(category._id)
                ? 'default'
                : 'secondary'
            }
            className='cursor-pointer'
            onClick={() => {
              const newCategories = filters.categories.includes(category._id)
                ? filters.categories.filter((id) => id !== category._id)
                : [...filters.categories, category._id];
              onFilterChange({ ...filters, categories: newCategories });
            }}
          >
            {category.name}
          </Badge>
        ))}
      </div>

      {/* Active Filters */}
      {(filters.search ||
        filters.categories.length > 0 ||
        filters.status !== 'all') && (
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>Active filters:</span>
          <Button
            variant='ghost'
            size='sm'
            onClick={() =>
              onFilterChange({
                ...filters,
                search: '',
                categories: [],
                status: 'all',
              })
            }
          >
            Clear all
            <X className='ml-2 h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  );
};
