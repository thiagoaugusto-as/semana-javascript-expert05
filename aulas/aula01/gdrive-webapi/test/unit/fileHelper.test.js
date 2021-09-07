import {
    describe,
    test,
    expect,
    jest
} from '@jest/globals'

import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'

import Routes from './../../src/routes.js'

describe('#FileHelper', () => {

    describe('#getFileStatus', () => {
        test('it should return files status in correct format', async () => {
            const statMock = {
                dev: 2067,
                mode: 33204,
                nlink: 1,
                uid: 1000,
                gid: 1000,
                rdev: 0,
                blksize: 4096,
                ino: 8791098,
                size: 20036,
                blocks: 40,
                atimeMs: 1630981101065.2627,
                mtimeMs: 1630981100553.263,
                ctimeMs: 1630981100553.263,
                birthtimeMs: 1630981100541.2632,
                atime: '2021-09-07T02:18:21.065Z',
                mtime: '2021-09-07T02:18:20.553Z',
                ctime: '2021-09-07T02:18:20.553Z',
                birthtime: '2021-09-07T02:18:20.541Z'
            }

            const mockUser = 'thiagoAugusto'
            const fileName = 'file.jpeg'
            process.env.USER = mockUser
            
            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([fileName])

            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)

            const result = await FileHelper.getFilesStatus('/tmp')

            const expectedResult = [
                {
                    size: "20 kB",
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: fileName
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${fileName}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})
