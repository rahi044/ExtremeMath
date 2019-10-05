using Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Models;

namespace EfDataAccess
{
    public class MathEfDataAccess : IMathematicsDataAccess
    {
        public Task SaveMath(AMath math)
        {
            return Task.Run(() =>
            {
                using (var entities = new MathDbEntities())
                using (var entitiesTransaction = entities.Database.BeginTransaction())
                {
                    try
                    {
                        var dbUser = entities.tbl_user.SingleOrDefault(x => x.name.ToLower() == math.User.UserName.Trim().ToLower());

                        var newUser = new tbl_user
                        {
                            name = math.User.UserName
                        };
                        var newMath = new tbl_math
                        {
                            number_1 = math.FirstNumber,
                            number_2 = math.SecondNumber,
                            summation = math.Result,
                            created_on = DateTime.Now
                        };

                        if (dbUser != null)
                        {
                            newMath.created_by = dbUser.id;
                            entities.tbl_math.Add(newMath);
                        }
                        else
                        {
                            newUser.tbl_math.Add(newMath);
                            entities.tbl_user.Add(newUser);
                        }

                        entities.SaveChanges();
                        entitiesTransaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        entitiesTransaction.Rollback();
                        throw new Exception(ex.ToString());
                    }
                }
            });
        }

        public async Task<GridItems<AMath>> GetMaths(QueryParams queryParams)
        {
            return await Task.Run(() =>
            {
                using (var entities = new MathDbEntities())
                {
                    var mathsQueryable = entities.tbl_math
                        .Select(x => new AMath
                        {
                            Id = x.id,
                            User = new User() {Id = x.tbl_user.id, UserName = x.tbl_user.name},
                            FirstNumber = x.number_1,
                            SecondNumber = x.number_2,
                            Result = x.summation,
                            Date = x.created_on
                        })
                        .OrderByDescending(x => x.Date);

                    List<AMath> maths;
                    if (queryParams.PageNumber > 0)
                        maths = mathsQueryable
                            .Skip((queryParams.PageNumber - 1)*queryParams.PageSize)
                            .Take(queryParams.PageSize)
                            .ToList();
                    else
                        maths = mathsQueryable.ToList();

                    var gridItems = new GridItems<AMath>
                    {
                        Items = maths,
                        TotalItems = maths.Count
                    };

                    return gridItems;
                }
            });
        }
    }
}
