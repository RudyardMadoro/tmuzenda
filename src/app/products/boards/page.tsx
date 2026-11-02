import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import BoardSupplyExperience from '@/components/products/BoardSupplyExperience';
import { productRepository } from '@/repositories/product-repository';
export const metadata: Metadata = { title: 'Board Supply & Cutting', description: 'Board supply and cut-to-size services for cabinetry and interior projects.' };
export default async function BoardsPage() { const items = await productRepository.getBoards(); return <><PageHero eyebrow="Board supply & cutting" title="Specify the board. Plan every panel." copy="Explore indicative board specifications and prepare a detailed cutting enquiry for review—without implying stock, price or production confirmation." image="/images/services/property-selection.jpg" /><section className="container-custom py-16 sm:py-24"><BoardSupplyExperience boards={items} /></section></>; }
