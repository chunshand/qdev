import { Injectable } from '@nestjs/common';
import { CreateSysConfigGroupDto } from './dto/createSysConfigGroup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSysConfigGroupDto } from './dto/updateSysConfigGroup.dto';
import { findSysConfigGroupDto } from './dto/findSysConfigGroup.dto';
import { SysConfigGroup } from '@/entity/sysConfigGroup.entity';
import { SysConfigGroupItem } from '@/entity/sysConfigGroupItem.entity';
import { CreateSysConfigGroupItemDto } from './dto/createSysConfigGroupItem.dto';
import { findSysConfigGroupItemDto } from './dto/findSysConfigGroupItem.dto';
import { UpdateSysConfigGroupItemDto } from './dto/updateSysConfigGroupItem.dto';

@Injectable()
export class SysConfigService {
  constructor(
    @InjectRepository(SysConfigGroup)
    private sysConfigGroupRepository: Repository<SysConfigGroup>,
    @InjectRepository(SysConfigGroupItem)
    private sysConfigGroupItemRepository: Repository<SysConfigGroupItem>,
  ) { }
  // ----------------------------------------------------------------------- 配置分组
  sysConfigGroupCreate(sysConfigGroup: CreateSysConfigGroupDto) {
    return this.sysConfigGroupRepository.save(sysConfigGroup);
  }

  sysConfigGroupFind(query: findSysConfigGroupDto): Promise<{ list: SysConfigGroup[], total: number }> {
    return new Promise(async (resolve) => {
      const list = await this.sysConfigGroupRepository
        .find()
      const total = await this.sysConfigGroupRepository.count();
      resolve({ list, total })
    })
  }
  sysConfigGroupFindAll(): Promise<SysConfigGroup[]> {
    return this.sysConfigGroupRepository
      .find()
  }

  sysConfigGroupFindOne(id: number) {
    return this.sysConfigGroupRepository.findOne({
      where: {
        id: id
      }
    })
  }

  sysConfigGroupUpdate(id: number, role: UpdateSysConfigGroupDto) {
    return this.sysConfigGroupRepository.update(id, role)
  }

  async sysConfigGroupRemove(id: number) {
    return this.sysConfigGroupRepository.delete(id)
  }
  // ----------------------------------------------------------------------- 配置项
  sysConfigGroupItemCreate(sysConfigGroupItem: CreateSysConfigGroupItemDto) {
    let sysConfigGroupItemData: any = sysConfigGroupItem;
    sysConfigGroupItemData.sysConfigGroup = { id: sysConfigGroupItem.sysConfigGroupId }
    sysConfigGroupItemData[sysConfigGroupItemData.type + "Value"] = sysConfigGroupItemData.value;
    return this.sysConfigGroupItemRepository.save(sysConfigGroupItemData);
  }

  sysConfigGroupItemFind(query: findSysConfigGroupItemDto): Promise<{ list: any[], total: number }> {
    return new Promise(async (resolve) => {
      const list = await this.sysConfigGroupItemRepository
        .find({
          where: {
            sysConfigGroup: {
              id: query.sysConfigGroupId
            }
          }
        })
      const _list = list.map((item) => {
        let value = item[item.type + "Value"];
        return {
          ...item,
          value
        }
      })
      const total = await this.sysConfigGroupItemRepository.count();
      resolve({ list: _list, total })
    })
  }
  sysConfigGroupItemFindAll(): Promise<SysConfigGroupItem[]> {
    return this.sysConfigGroupItemRepository
      .find()
  }

  sysConfigGroupItemFindOne(id: number) {
    return this.sysConfigGroupItemRepository.findOne({
      where: {
        id: id
      }
    })
  }

  async sysConfigGroupItemUpdate(id: number, value: UpdateSysConfigGroupItemDto) {
    let data: any = value;
    let find = await this.sysConfigGroupItemRepository.findOne({
      where: { id: id }
    })
    if (!find) {
      return false;
    }
    if (data.value != undefined) {
      data[find.type + "Value"] = find.type=='number' ? +data.value : data.value;
      delete data.value;
    }

    return this.sysConfigGroupItemRepository.update(id, data)
  }

  async sysConfigGroupItemRemove(id: number) {
    return this.sysConfigGroupItemRepository.delete(id)
  }
}
